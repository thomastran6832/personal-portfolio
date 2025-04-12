// Function to fetch markdown content and parse it
async function fetchContent(contentType, slug = '') {
    let url;
    
    if (slug) {
      url = `/content/${contentType}/${slug}.md`;
    } else {
      url = `/content/${contentType}`;
    }
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.statusText}`);
      }
      
      const content = await response.text();
      return parseMarkdown(content);
    } catch (error) {
      console.error(`Error fetching ${contentType} content:`, error);
      return null;
    }
  }
  
  // Function to parse YAML front matter and markdown content
  function parseMarkdown(markdown) {
    // Simple parser for front matter
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = markdown.match(frontMatterRegex);
    
    if (!match) {
      return { content: markdown };
    }
    
    const frontMatter = match[1];
    const content = match[2];
    
    // Parse front matter as YAML
    const metadata = {};
    const frontMatterLines = frontMatter.split('\n');
    
    for (const line of frontMatterLines) {
      if (line.trim() === '') continue;
      
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;
      
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Handle lists
      if (value === '') {
        const listItems = [];
        let i = frontMatterLines.indexOf(line) + 1;
        
        while (i < frontMatterLines.length && frontMatterLines[i].trim().startsWith('-')) {
          listItems.push(frontMatterLines[i].trim().slice(2).trim());
          i++;
        }
        
        if (listItems.length > 0) {
          metadata[key] = listItems;
          continue;
        }
      }
      
      metadata[key] = value;
    }
    
    return {
      metadata,
      content: content.trim()
    };
  }
  
  // Load About Me section
  async function loadAboutSection() {
    const aboutData = await fetchContent('about', 'about-me');
    if (!aboutData) return;
    
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    
    // Create and populate about section
    const profileImg = document.createElement('img');
    profileImg.src = aboutData.metadata.profile_image;
    profileImg.alt = 'Profile';
    profileImg.className = 'profile-image';
    
    const bioDiv = document.createElement('div');
    bioDiv.className = 'bio';
    bioDiv.innerHTML = `
      <h2>${aboutData.metadata.title}</h2>
      <div class="bio-content">${aboutData.content}</div>
    `;
    
    // Create skills list
    const skillsDiv = document.createElement('div');
    skillsDiv.className = 'skills';
    skillsDiv.innerHTML = '<h3>Skills</h3>';
    
    const skillsList = document.createElement('ul');
    aboutData.metadata.skills.forEach(skill => {
      const skillItem = document.createElement('li');
      skillItem.textContent = skill;
      skillsList.appendChild(skillItem);
    });
    
    skillsDiv.appendChild(skillsList);
    bioDiv.appendChild(skillsDiv);
    
    // Clear and append new content
    aboutSection.innerHTML = '';
    aboutSection.appendChild(profileImg);
    aboutSection.appendChild(bioDiv);
  }
  
  // Load Projects section
  async function loadProjects() {
    try {
      const projectsSection = document.getElementById('projects');
      if (!projectsSection) return;
      
      // Assuming you have a directory listing endpoint or you know all project filenames
      // For demo purposes, we're just loading the one project we created
      const projectData = await fetchContent('projects', 'portfolio-website');
      if (!projectData) return;
      
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      
      projectCard.innerHTML = `
        <div class="project-image">
          <img src="${projectData.metadata.image}" alt="${projectData.metadata.title}">
        </div>
        <div class="project-info">
          <h3>${projectData.metadata.title}</h3>
          <p>${projectData.metadata.description}</p>
          <div class="project-links">
            ${projectData.metadata.url ? `<a href="${projectData.metadata.url}" target="_blank">Live Demo</a>` : ''}
            ${projectData.metadata.github ? `<a href="${projectData.metadata.github}" target="_blank">GitHub</a>` : ''}
          </div>
          <div class="tech-stack">
            ${projectData.metadata.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
        </div>
      `;
      
      // Clear and append new content
      const projectsContainer = projectsSection.querySelector('.projects-container') || projectsSection;
      projectsContainer.appendChild(projectCard);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  }
  
  // Load navigation
  async function loadNavigation() {
    try {
      const response = await fetch('/content/config/navigation.yml');
      const yamlText = await response.text();
      
      // Simple YAML parser for our needs
      const navItems = [];
      const lines = yamlText.split('\n');
      let inNavItems = false;
      
      let currentItem = {};
      
      for (const line of lines) {
        if (line.trim() === 'nav_items:') {
          inNavItems = true;
          continue;
        }
        
        if (inNavItems && line.trim().startsWith('-')) {
          if (Object.keys(currentItem).length > 0) {
            navItems.push(currentItem);
            currentItem = {};
          }
          continue;
        }
        
        if (inNavItems && line.trim().startsWith('label:')) {
          currentItem.label = line.split('label:')[1].trim();
        }
        
        if (inNavItems && line.trim().startsWith('url:')) {
          currentItem.url = line.split('url:')[1].trim();
        }
      }
      
      if (Object.keys(currentItem).length > 0) {
        navItems.push(currentItem);
      }
      
      // Create navigation menu
      const nav = document.querySelector('nav ul') || document.createElement('ul');
      nav.innerHTML = '';
      
      navItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.url;
        a.textContent = item.label;
        li.appendChild(a);
        nav.appendChild(li);
      });
      
      // If the nav doesn't exist in the DOM, find the nav element and append the ul
      const navElement = document.querySelector('nav');
      if (navElement && !navElement.contains(nav)) {
        navElement.appendChild(nav);
      }
    } catch (error) {
      console.error('Error loading navigation:', error);
    }
  }
  
  // Load contact information
  async function loadContactInfo() {
    try {
      const response = await fetch('/content/config/contact.yml');
      const yamlText = await response.text();
      
      // Simple YAML parsing for contact info
      const contactInfo = {};
      const lines = yamlText.split('\n');
      
      for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;
        
        const key = line.slice(0, colonIndex).trim();
        const value = line.slice(colonIndex + 1).trim();
        
        if (value !== '') {
          contactInfo[key] = value;
        }
      }
      
      // Update contact section
      const contactSection = document.getElementById('contact');
      if (!contactSection) return;
      
      const contactLinks = document.createElement('div');
      contactLinks.className = 'contact-links';
      
      if (contactInfo.email) {
        const emailLink = document.createElement('a');
        emailLink.href = `mailto:${contactInfo.email}`;
        emailLink.innerHTML = `<i class="fas fa-envelope"></i> Email`;
        contactLinks.appendChild(emailLink);
      }
      
      if (contactInfo.linkedin) {
        const linkedinLink = document.createElement('a');
        linkedinLink.href = contactInfo.linkedin;
        linkedinLink.target = '_blank';
        linkedinLink.innerHTML = `<i class="fab fa-linkedin"></i> LinkedIn`;
        contactLinks.appendChild(linkedinLink);
      }
      
      if (contactInfo.github) {
        const githubLink = document.createElement('a');
        githubLink.href = contactInfo.github;
        githubLink.target = '_blank';
        githubLink.innerHTML = `<i class="fab fa-github"></i> GitHub`;
        contactLinks.appendChild(githubLink);
      }
      
      if (contactInfo.twitter) {
        const twitterLink = document.createElement('a');
        twitterLink.href = contactInfo.twitter;
        twitterLink.target = '_blank';
        twitterLink.innerHTML = `<i class="fab fa-twitter"></i> Twitter`;
        contactLinks.appendChild(twitterLink);
      }
      
      // Clear and append new content
      const contactContainer = contactSection.querySelector('.contact-container') || contactSection;
      contactContainer.innerHTML = '<h2>Contact Me</h2>';
      contactContainer.appendChild(contactLinks);
    } catch (error) {
      console.error('Error loading contact info:', error);
    }
  }
  
  // Initialize all content when the DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    loadNavigation();
    loadAboutSection();
    loadProjects();
    loadContactInfo();
  });