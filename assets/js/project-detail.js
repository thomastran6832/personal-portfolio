// Dynamic project detail loader
document.addEventListener('DOMContentLoaded', function() {
    // Get project ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (!projectId) {
        showError();
        return;
    }

    // Load project data from the same source as the main page
    loadProjectData(projectId);
});

function loadProjectData(projectId) {
    // Project data - same as in project-data.js
    const projectsData = {
        "projects": [
            {
                "id": "P1",
                "title": "I-Payout e-Wallet",
                "description": "A fully responsive e-commerce platform with product management, shopping cart, and secure checkout functionality.i-payout's eWallet enables businesses to offer secure, flexible, and efficient payment options worldwide. Our platform allows recipients to access funds easily, providing a versatile solution for managing payments across borders, currencies, and platforms.",
                "image": "./assets/images/project-1.jpg",
                "technologies": ["React", "Node.js", "MongoDB"],
                "github": "https://github.com/yourusername/project1",
                "demo": "https://project1-demo.com",
                "category": "Finance",
                "features": [
                    "Responsive e-commerce platform",
                    "Product management system",
                    "Shopping cart functionality",
                    "Secure checkout process",
                    "Cross-border payment solutions",
                    "Multi-currency support",
                    "Global payment access"
                ]
            },
            {
                "id": "P2",
                "title": "Fitness Tracker App",
                "description": "A mobile application that helps users track their fitness activities, set goals, and monitor their progress. The app provides comprehensive fitness tracking capabilities with an intuitive user interface designed for daily use.",
                "image": "./assets/images/project-2.png",
                "technologies": ["React Native", "Firebase", "Redux"],
                "github": "https://github.com/yourusername/project2",
                "demo": "https://project2-demo.com",
                "category": "Health",
                "features": [
                    "Activity tracking and logging",
                    "Goal setting and management",
                    "Progress monitoring and analytics",
                    "User profile and preferences",
                    "Data visualization and charts",
                    "Cross-platform compatibility",
                    "Real-time data synchronization"
                ]
            },
            {
                "id": "project3",
                "title": "Portfolio Website",
                "description": "A personal portfolio website showcasing my projects and skills, built with modern web technologies. This responsive website serves as a professional showcase of my development capabilities and project portfolio.",
                "image": "./assets/images/project-3.jpg",
                "technologies": ["HTML", "CSS", "JavaScript"],
                "github": "https://github.com/thomastran6832/personal-portfolio",
                "demo": "https://thomastran.netlify.app",
                "category": "web design",
                "features": [
                    "Responsive design for all devices",
                    "Modern and clean user interface",
                    "Project showcase with details",
                    "Skills and experience sections",
                    "Contact form integration",
                    "Fast loading and optimized performance",
                    "Cross-browser compatibility"
                ]
            }
        ]
    };

    // Find the specific project
    const project = projectsData.projects.find(p => p.id === projectId);

    if (!project) {
        showError();
        return;
    }

    // Populate the page with project data
    populateProjectDetail(project);
}

function populateProjectDetail(project) {
    // Hide loading state
    const loadingState = document.getElementById('loading-state');
    if (loadingState) loadingState.style.display = 'none';


    // Update page title
    document.title = `${project.title} - Thomas Tran`;

    // Populate project details
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-category').textContent = project.category;
    document.getElementById('project-description').textContent = project.description;

    // Set project image
    const projectImage = document.getElementById('project-image');
    projectImage.src = project.image;
    projectImage.alt = project.title;

    // Populate technologies
    const techContainer = document.getElementById('project-technologies');
    techContainer.innerHTML = project.technologies.map(tech =>
        `<span class="tech-item" style="background: #0c0c0c; color: #ffdb70; padding: 12px 20px; border-radius: 25px; border: 2px solid #ffdb70; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s ease; display: inline-block; margin: 5px; cursor: pointer;" onmouseover="this.style.background='#ffdb70'; this.style.color='#0c0c0c'; this.style.transform='translateY(-3px)'" onmouseout="this.style.background='#0c0c0c'; this.style.color='#ffdb70'; this.style.transform='translateY(0)'">${tech}</span>`
    ).join('');

    // Populate features
    const featuresContainer = document.getElementById('project-features');
    featuresContainer.style.cssText = 'list-style: none; display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-top: 15px; width: 100%;';

    if (project.features && project.features.length > 0) {
        featuresContainer.innerHTML = project.features.map((feature) =>
            `<li style="color: rgba(255, 255, 255, 0.9); font-size: 0.9rem; padding: 10px 15px; background: rgba(46, 46, 51, 0.4); border-radius: 8px; border-left: 3px solid rgba(255, 219, 112, 0.5); position: relative; transition: all 0.1s ease; backdrop-filter: blur(10px); line-height: 1.4;" onmouseover="this.style.background='rgba(255, 219, 112, 0.1)'; this.style.borderLeftColor='rgba(255, 219, 112, 0.8)'" onmouseout="this.style.background='rgba(46, 46, 51, 0.4)'; this.style.borderLeftColor='rgba(255, 219, 112, 0.5)'">
                ${feature}
            </li>`
        ).join('');
    } else {
        // Generate default features based on project type
        const defaultFeatures = generateDefaultFeatures(project);
        featuresContainer.innerHTML = defaultFeatures.map((feature) =>
            `<li style="color: rgba(255, 255, 255, 0.9); font-size: 0.9rem; padding: 10px 15px; background: rgba(46, 46, 51, 0.4); border-radius: 8px; border-left: 3px solid rgba(255, 219, 112, 0.5); position: relative; transition: all 0.1s ease; backdrop-filter: blur(10px); line-height: 1.4;" onmouseover="this.style.background='rgba(255, 219, 112, 0.1)'; this.style.borderLeftColor='rgba(255, 219, 112, 0.8)'" onmouseout="this.style.background='rgba(46, 46, 51, 0.4)'; this.style.borderLeftColor='rgba(255, 219, 112, 0.5)'">
                ${feature}
            </li>`
        ).join('');
    }
}

function generateDefaultFeatures(project) {
    // Generate default features based on project category and technologies
    const features = [];

    if (project.category.includes('web')) {
        features.push('Responsive web design');
        features.push('Modern user interface');
        features.push('Cross-browser compatibility');
    }

    if (project.category.includes('application')) {
        features.push('Cross-platform compatibility');
        features.push('User-friendly interface');
        features.push('Data management');
    }

    if (project.technologies.includes('React') || project.technologies.includes('React Native')) {
        features.push('Component-based architecture');
        features.push('State management');
    }

    if (project.technologies.includes('Node.js')) {
        features.push('Server-side functionality');
        features.push('API integration');
    }

    if (project.technologies.includes('MongoDB') || project.technologies.includes('Firebase')) {
        features.push('Database integration');
        features.push('Real-time data updates');
    }

    // Add some generic features if we don't have enough
    if (features.length < 3) {
        features.push('Professional implementation');
        features.push('Optimized performance');
        features.push('Scalable architecture');
    }

    return features;
}

function showError() {
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');

    if (loadingState) loadingState.style.display = 'none';
    if (errorState) errorState.style.display = 'block';
}