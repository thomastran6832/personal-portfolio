// GIF Optimization and Performance Enhancement
document.addEventListener('DOMContentLoaded', function() {

    // GIF lazy loading optimization
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const gifObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const gif = entry.target;

                // Add loaded class for smooth transition
                if (gif.complete) {
                    gif.classList.add('loaded');
                } else {
                    gif.addEventListener('load', () => {
                        gif.classList.add('loaded');
                    });
                }

                // Stop observing this GIF
                observer.unobserve(gif);
            }
        });
    }, observerOptions);

    // Observe all GIF images
    function observeGifs() {
        const gifImages = document.querySelectorAll('.gif-image[loading="lazy"]');
        gifImages.forEach(gif => {
            gifObserver.observe(gif);
        });
    }

    // Initial observation
    observeGifs();

    // Re-observe when new content is loaded (for dynamically loaded projects)
    const contentObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                setTimeout(observeGifs, 100); // Small delay to ensure DOM is ready
            }
        });
    });

    // Observe the projects container for dynamic content
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        contentObserver.observe(projectsContainer, { childList: true, subtree: true });
    }

    // GIF performance optimization based on user preferences
    function optimizeGifPerformance() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isSlowConnection = navigator.connection && (
            navigator.connection.effectiveType === 'slow-2g' ||
            navigator.connection.effectiveType === '2g' ||
            navigator.connection.saveData
        );

        const gifImages = document.querySelectorAll('.gif-image');

        if (prefersReducedMotion || isSlowConnection) {
            gifImages.forEach(gif => {
                // For slow connections or reduced motion preference, pause GIFs
                gif.style.animationPlayState = 'paused';

                // Add click to play functionality
                gif.style.cursor = 'pointer';
                gif.title = 'Click to play animation';

                gif.addEventListener('click', function() {
                    this.style.animationPlayState = 'running';
                    this.style.cursor = 'default';
                    this.title = '';
                }, { once: true });
            });
        }
    }

    // Run optimization
    optimizeGifPerformance();

    // Preload critical GIFs for better UX
    function preloadCriticalGifs() {
        const criticalGifs = document.querySelectorAll('.gif-image[data-priority="high"]');
        criticalGifs.forEach(gif => {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = gif.src;
            document.head.appendChild(preloadLink);
        });
    }

    preloadCriticalGifs();

    // Pause GIFs when tab is not visible to save resources
    let gifsPaused = false;

    document.addEventListener('visibilitychange', function() {
        const gifImages = document.querySelectorAll('.gif-image');

        if (document.hidden && !gifsPaused) {
            gifImages.forEach(gif => {
                gif.dataset.wasPlaying = gif.style.animationPlayState !== 'paused';
                gif.style.animationPlayState = 'paused';
            });
            gifsPaused = true;
        } else if (!document.hidden && gifsPaused) {
            gifImages.forEach(gif => {
                if (gif.dataset.wasPlaying === 'true') {
                    gif.style.animationPlayState = 'running';
                }
                delete gif.dataset.wasPlaying;
            });
            gifsPaused = false;
        }
    });

    // Add hover pause functionality for GIFs in projects
    function addHoverControls() {
        const projectGifs = document.querySelectorAll('.project-item .gif-image');

        projectGifs.forEach(gif => {
            let isHovered = false;

            gif.parentElement.addEventListener('mouseenter', function() {
                isHovered = true;
                // Small delay to prevent accidental pausing
                setTimeout(() => {
                    if (isHovered) {
                        gif.style.animationPlayState = 'paused';
                    }
                }, 500);
            });

            gif.parentElement.addEventListener('mouseleave', function() {
                isHovered = false;
                gif.style.animationPlayState = 'running';
            });
        });
    }

    // Add controls after content loads
    setTimeout(addHoverControls, 1000);

    // Console log for debugging
    console.log('🎞️ GIF Optimization loaded');
    console.log(`📊 Found ${document.querySelectorAll('.gif-image').length} GIF images`);
});

// Utility function to convert static images to GIFs
function replaceWithGif(staticImagePath, gifImagePath) {
    const staticImages = document.querySelectorAll(`img[src="${staticImagePath}"]`);
    staticImages.forEach(img => {
        img.src = gifImagePath;
        img.classList.add('gif-image');

        // Re-trigger optimization
        if (img.loading === 'lazy') {
            img.classList.remove('loaded');
        }
    });
}

// Export for global use
window.GifOptimizer = {
    replaceWithGif: replaceWithGif
};