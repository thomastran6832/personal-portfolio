// Function to load project data
function loadProjectData() {
    // Find the projects container
    const projectsContainer = document.getElementById('projects-container');

    // Exit if container doesn't exist
    if (!projectsContainer) {
        return;
    }

    // Check if already loaded to avoid reloading
    if (projectsContainer.dataset.loaded === 'true') {
        return;
    }
    
    // Project data directly in the JS file
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
                "category": "finance"
            },
            {
                "id": "P2",
                "title": "Fitness Tracker App",
                "description": "A mobile application that helps users track their fitness activities, set goals, and monitor their progress.",
                "image": "./assets/images/project-2.png",
                "technologies": ["React Native", "Firebase", "Redux"],
                "github": "https://github.com/yourusername/project2",
                "demo": "https://project2-demo.com",
                "category": "health-care"
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
            },
            {
                "id": "P4",
                "title": "E-Learning Platform",
                "description": "An online learning management system with course creation, student tracking, and interactive assessments.",
                "image": "./assets/images/project-4.png",
                "technologies": ["Vue.js", "Laravel", "MySQL"],
                "github": "https://github.com/yourusername/project4",
                "demo": "https://project4-demo.com",
                "category": "education"
            }
        ]
    };
    
    // Clear loading message
    projectsContainer.innerHTML = '';

    // Get unique categories from projects
    const categories = [...new Set(projectsData.projects.map(project => project.category))];

    // Generate dynamic filter buttons
    generateFilterButtons(categories);

    // Create project cards using the existing HTML structure in your template
    projectsData.projects.forEach(project => {
        // Create HTML using the same structure as your existing portfolio items
        const projectItem = document.createElement('li');
        projectItem.className = 'project-item active';
        projectItem.setAttribute('data-filter-item', '');
        projectItem.setAttribute('data-category', project.category);

        const projectHTML = `
            <a href="project-detail.html?id=${project.id}">
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

    // Mark as loaded to prevent reloading
    projectsContainer.dataset.loaded = 'true';

    // Reinitialize filter functionality after loading projects
    initializeFilters();
}

// Load project data when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initial load attempt
    loadProjectData();

    // Also load when Project tab is clicked
    const navLinks = document.querySelectorAll('[data-nav-link]');
    navLinks.forEach(link => {
        if (link.textContent.toLowerCase() === 'project') {
            link.addEventListener('click', function() {
                setTimeout(loadProjectData, 100); // Small delay to ensure page is visible
            });
        }
    });
});

// Function to generate dynamic filter buttons
function generateFilterButtons(categories) {
    const filterList = document.querySelector('.filter-list');
    const selectList = document.querySelector('.select-list');

    if (!filterList || !selectList) {
        return;
    }

    // Clear existing filter buttons (except "All")
    filterList.innerHTML = '<li class="filter-item"><button class="active" data-filter-btn>All</button></li>';
    selectList.innerHTML = '<li class="select-item"><button data-select-item>All</button></li>';

    // Add category buttons
    categories.forEach(category => {
        // Create filter button for large screen
        const filterItem = document.createElement('li');
        filterItem.className = 'filter-item';
        filterItem.innerHTML = `<button data-filter-btn>${category.charAt(0).toUpperCase() + category.slice(1)}</button>`;
        filterList.appendChild(filterItem);

        // Create select option for mobile
        const selectItem = document.createElement('li');
        selectItem.className = 'select-item';
        selectItem.innerHTML = `<button data-select-item>${category.charAt(0).toUpperCase() + category.slice(1)}</button>`;
        selectList.appendChild(selectItem);
    });
}

// Function to initialize filter functionality
function initializeFilters() {
    const select = document.querySelector("[data-select]");
    const selectItems = document.querySelectorAll("[data-select-item]");
    const selectValue = document.querySelector("[data-selecct-value]");
    const filterBtn = document.querySelectorAll("[data-filter-btn]");
    const filterItems = document.querySelectorAll("[data-filter-item]");

    // Filter function
    const filterFunc = function (selectedValue) {
        for (let i = 0; i < filterItems.length; i++) {
            if (selectedValue === "all") {
                filterItems[i].classList.add("active");
            } else if (selectedValue === filterItems[i].dataset.category) {
                filterItems[i].classList.add("active");
            } else {
                filterItems[i].classList.remove("active");
            }
        }
    };

    // Add event to select dropdown
    if (select) {
        select.addEventListener("click", function () {
            this.classList.toggle("active");
        });
    }

    // Add event to all select items
    selectItems.forEach(item => {
        item.addEventListener("click", function () {
            let selectedValue = this.innerText.toLowerCase();
            if (selectValue) selectValue.innerText = this.innerText;
            if (select) select.classList.remove("active");
            filterFunc(selectedValue);
        });
    });

    // Add event to all filter button items for large screen
    let lastClickedBtn = filterBtn[0];

    filterBtn.forEach(btn => {
        btn.addEventListener("click", function () {
            let selectedValue = this.innerText.toLowerCase();
            if (selectValue) selectValue.innerText = this.innerText;
            filterFunc(selectedValue);

            if (lastClickedBtn) lastClickedBtn.classList.remove("active");
            this.classList.add("active");
            lastClickedBtn = this;
        });
    });
}