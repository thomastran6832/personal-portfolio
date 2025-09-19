'use strict';

/**
 * Animation Controller for Portfolio Website
 * Handles scroll-triggered animations for all pages
 */

class AnimationController {
  constructor() {
    this.initScrollReveal();
    this.initClientAnimations();
    this.initPageSwitching();
  }

  // Progressive reveal on scroll
  initScrollReveal() {
    this.createObserver();
    this.addRevealClasses();
  }

  createObserver() {
    // Create intersection observer with better performance
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Immediately add revealed class for faster response
          entry.target.classList.add('revealed');
        } else {
          // Remove revealed class when out of view so animation can replay
          entry.target.classList.remove('revealed');
        }
      });
    }, {
      threshold: 0.01, // Much lower threshold for instant triggering
      rootMargin: '100px 0px 0px 0px' // Trigger animations much sooner
    });
  }

  addRevealClasses() {
    // Remove existing reveal classes
    document.querySelectorAll('.reveal-element').forEach(el => {
      el.classList.remove('reveal-element', 'revealed', 'reveal-left', 'reveal-right', 'reveal-scale');
      el.className = el.className.replace(/reveal-delay-\d+/g, '');
    });

    // About section cards - target the specific card divs
    const aboutCards = document.querySelectorAll('.about-intro, .about-expertise, .about-passion, .about-goals');
    aboutCards.forEach((card, index) => {
      if (card) {
        card.classList.add('reveal-element', 'reveal-scale', `reveal-delay-${index + 1}`);
        this.observer.observe(card);
      }
    });

    // Services section
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
      item.classList.add('reveal-element', 'reveal-scale', `reveal-delay-${index + 1}`);
      this.observer.observe(item);
    });

    // Resume timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      const direction = index % 2 === 0 ? 'reveal-left' : 'reveal-right';
      item.classList.add('reveal-element', direction, `reveal-delay-${Math.min(index + 1, 6)}`);
      this.observer.observe(item);
    });

    // Skills
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
      tag.classList.add('reveal-element', 'reveal-scale', `reveal-delay-${Math.min(index + 1, 6)}`);
      this.observer.observe(tag);
    });

    // Project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
      item.classList.add('reveal-element', 'reveal-scale', `reveal-delay-${Math.min(index + 1, 6)}`);
      this.observer.observe(item);
    });

    // Testimonials section - Make all same size
    const testimonialItems = document.querySelectorAll('.testimonials-item');
    testimonialItems.forEach((item, index) => {
      const direction = index % 2 === 0 ? 'reveal-left' : 'reveal-right';
      item.classList.add('reveal-element', direction, `reveal-delay-${Math.min(index + 1, 6)}`);
      this.observer.observe(item);
    });

    // Client logos
    const clientItems = document.querySelectorAll('.clients-item');
    clientItems.forEach((item, index) => {
      item.classList.add('reveal-element', `reveal-delay-${Math.min(index + 1, 6)}`);
      this.observer.observe(item);
    });

    // Contact form elements
    const contactElements = document.querySelectorAll('.contact-info-box, .contact-form-box');
    contactElements.forEach((item, index) => {
      const direction = index % 2 === 0 ? 'reveal-left' : 'reveal-right';
      item.classList.add('reveal-element', direction, `reveal-delay-${index + 1}`);
      this.observer.observe(item);
    });
  }

  // Handle page switching
  initPageSwitching() {
    const navLinks = document.querySelectorAll('[data-nav-link]');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Small delay to allow page switch, then reinitialize animations
        setTimeout(() => {
          this.addRevealClasses();
        }, 100);
      });
    });
  }

  // Client logo animations
  initClientAnimations() {
    const clientLogos = document.querySelectorAll('.clients-item img');

    clientLogos.forEach((logo, index) => {
      // Add base animation classes
      logo.classList.add('client-logo-animated');

      // Add floating animation with random delay
      setTimeout(() => {
        logo.classList.add('floating-logo');
      }, index * 200);

      // Add pulse glow on hover
      logo.parentElement.addEventListener('mouseenter', () => {
        logo.classList.add('pulse-glow');
      });

      logo.parentElement.addEventListener('mouseleave', () => {
        logo.classList.remove('pulse-glow');
      });
    });
  }
}

// Additional CSS animations via JavaScript
const additionalStyles = `
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AnimationController();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationController;
}