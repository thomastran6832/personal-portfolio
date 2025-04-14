// Load project data from JSON file
document.addEventListener('DOMContentLoaded', function() {
    // Find the projects container
    const projectsContainer = document.getElementById('projects-container');
    
    // Exit if container doesn't exist (not on a page with projects)
    if (!projectsContainer) return;
    
    // Function to load projects
    async function loadProjects() {
        try {
            // Fetch project data
            const response = await fetch('data/project.json');
            const data = await response.json();
            
            // Clear loading message
            projectsContainer.innerHTML = '';
            
            // Create project cards for each project
            data.projects.forEach(project => {
                // Create HTML that matches your existing design
                const projectCard = `
                    <div class="project-card" data-category="${project.category}">
                        <div class="project-img">
                            <img src="${project.image}" alt="${project.title}">
                        </div>
                        <div class="project-content">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <div class="project-tech">
                                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                            </div>
                            <div class="project-links">
                                ${project.github ? `<a href="${project.github}" target="_blank" class="project-link"><i class="fab fa-github"></i> Code</a>` : ''}
                                ${project.demo ? `<a href="${project.demo}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i> Live</a>` : ''}
                            </div>
                        </div>
                    </div>
                `;
                
                // Add to container
                projectsContainer.innerHTML += projectCard;
            });
            
            // Initialize project filters
            initializeProjectFilters();
            
        } catch (error) {
            console.error('Error loading projects:', error);
            projectsContainer.innerHTML = '<p>Error loading projects. Please try again later.</p>';
        }
    }
    
    // Load projects
    loadProjects();
    
    // Initialize project filters (assuming you have filter functionality)
    function initializeProjectFilters() {
        const filterButtons = document.querySelectorAll('.project-filter');
        const projectCards = document.querySelectorAll('.project-card');
        
        // Skip if no filter buttons
        if (!filterButtons.length) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects
                const filter = button.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        const category = card.getAttribute('data-category');
                        card.style.display = category.includes(filter) ? 'block' : 'none';
                    }
                });
            });
        });
    }
});