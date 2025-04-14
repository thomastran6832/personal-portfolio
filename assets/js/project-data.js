// Load project data for portfolio section
document.addEventListener('DOMContentLoaded', function() {
    // Find the projects container
    const projectsContainer = document.getElementById('projects-container');
    
    // Exit if container doesn't exist
    if (!projectsContainer) return;
    
    // Project data directly in the JS file
    const projectsData = {
        "projects": [
            {
                "id": "project1",
                "title": "E-Commerce Website",
                "description": "A fully responsive e-commerce platform with product management, shopping cart, and secure checkout functionality.",
                "image": "./assets/images/project-1.jpg",
                "technologies": ["React", "Node.js", "MongoDB"],
                "github": "https://github.com/yourusername/project1",
                "demo": "https://project1-demo.com",
                "category": "web development"
            },
            {
                "id": "project2",
                "title": "Fitness Tracker App",
                "description": "A mobile application that helps users track their fitness activities, set goals, and monitor their progress.",
                "image": "./assets/images/project-2.png",
                "technologies": ["React Native", "Firebase", "Redux"],
                "github": "https://github.com/yourusername/project2",
                "demo": "https://project2-demo.com",
                "category": "applications"
            },
            {
                "id": "project3",
                "title": "Portfolio Website",
                "description": "A personal portfolio website showcasing my projects and skills, built with modern web technologies.",
                "image": "./assets/images/project-3.jpg",
                "technologies": ["HTML", "CSS", "JavaScript"],
                "github": "https://github.com/thomastran6832/personal-portfolio",
                "demo": "https://thomastran.netlify.app",
                "category": "web design"
            }
        ]
    };
    
    // Clear loading message
    projectsContainer.innerHTML = '';
    
    // Create project cards using the existing HTML structure in your template
    projectsData.projects.forEach(project => {
        // Create HTML using the same structure as your existing portfolio items
        const projectItem = document.createElement('li');
        projectItem.className = 'project-item active';
        projectItem.setAttribute('data-filter-item', '');
        projectItem.setAttribute('data-category', project.category);
        
        const projectHTML = `
            <a href="${project.demo}" target="_blank">
                <figure class="project-img">
                    <div class="project-item-icon-box">
                        <ion-icon name="eye-outline"></ion-icon>
                    </div>
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                </figure>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-category">${project.category}</p>
            </a>
        `;
        
        projectItem.innerHTML = projectHTML;
        projectsContainer.appendChild(projectItem);
    });
});