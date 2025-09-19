'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// NOTE: Filter functionality has been moved to project-data.js for dynamic category generation
// This section is commented out to prevent conflicts with the dynamic filtering system

/*
// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

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

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}
*/



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// Slack integration - ensure URL is available
const getSlackWebhookURL = () => {
  return window.SLACK_WEBHOOK_URL ||
         (typeof process !== 'undefined' && process.env && process.env.SLACK_WEBHOOK_URL) ||
         'https://hooks.slack.com/services/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';
};

async function sendToSlack(formData) {
  try {
    console.log('📤 Sending to Slack via Netlify function...');

    // Use Netlify function instead of direct Slack webhook
    const response = await fetch('/.netlify/functions/slack-notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullname: formData.fullname,
        email: formData.email,
        message: formData.message
      })
    });

    console.log('📨 Function response status:', response.status);

    if (response.ok) {
      const result = await response.json();
      console.log('📨 Function response:', result);

      if (result.success) {
        console.log('✅ Message successfully sent to Slack via function!');
        return { success: true, message: 'Slack notification sent successfully' };
      } else {
        console.error('❌ Function reported error:', result.error);
        return { success: false, error: result.error || 'Unknown function error' };
      }
    } else {
      const errorText = await response.text();
      console.error('❌ Function HTTP error:', response.status, errorText);
      return { success: false, error: `Function error: ${response.status}` };
    }

  } catch (error) {
    console.error('❌ Network error calling function:', error);
    return { success: false, error: `Network error: ${error.message}` };
  }
}

// Function to show popup message
function showPopupMessage(message, isSuccess = true) {
  // Remove existing popup if any
  const existingPopup = document.querySelector('.popup-message');
  if (existingPopup) {
    existingPopup.remove();
  }

  // Create popup element
  const popup = document.createElement('div');
  popup.className = 'popup-message';
  popup.innerHTML = `
    <div class="popup-content">
      <div class="popup-icon">${isSuccess ? '✅' : '❌'}</div>
      <div class="popup-text">${message}</div>
    </div>
  `;

  // Add styles
  popup.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #2a2a2b, #1e1e1f);
    border: 2px solid ${isSuccess ? '#4CAF50' : '#f44336'};
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    z-index: 10000;
    text-align: center;
    min-width: 300px;
    opacity: 0;
    animation: popupFadeIn 0.3s ease forwards;
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes popupFadeIn {
      from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
      to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    @keyframes popupFadeOut {
      from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
    .popup-content {
      color: #fff;
    }
    .popup-icon {
      font-size: 3rem;
      margin-bottom: 15px;
    }
    .popup-text {
      font-size: 1.1rem;
      line-height: 1.4;
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(popup);

  // Auto-remove after 4 seconds
  setTimeout(() => {
    popup.style.animation = 'popupFadeOut 0.3s ease forwards';
    setTimeout(() => {
      popup.remove();
      style.remove();
    }, 300);
  }, 4000);
}

// Enhanced form submission handler for Netlify Forms
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default submission for custom handling

    // Disable submit button during submission
    formBtn.style.opacity = '0.7';
    formBtn.style.cursor = 'not-allowed';
    formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';

    // Get form data
    const formData = new FormData(this);

    // Submit to Netlify
    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      // Show success popup
      showPopupMessage('Message sent successfully! Wait for a few hours, I will contact you back.', true);

      // Send to Slack (separate from Netlify)
      const data = {
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      sendToSlack(data).then(slackResult => {
        if (slackResult.success) {
          console.log('✅ Slack notification sent:', slackResult.message);
          // Show brief success indicator for Slack
          setTimeout(() => {
            const popup = document.querySelector('.popup-message');
            if (popup) {
              popup.querySelector('.popup-text').innerHTML += '<br><small style="color: #4CAF50;">✅ Slack notification sent</small>';
            }
          }, 500);
        } else {
          console.log('⚠️ Slack notification failed:', slackResult.error);
          // Show warning but don't block main success
          setTimeout(() => {
            const popup = document.querySelector('.popup-message');
            if (popup) {
              popup.querySelector('.popup-text').innerHTML += '<br><small style="color: #ff9800;">⚠️ Slack notification blocked by browser</small>';
            }
          }, 500);
        }
      }).catch(error => {
        console.log('ℹ️ Slack notification error:', error);
      });

      // Reset form
      form.reset();

      // Reset button
      formBtn.style.opacity = '1';
      formBtn.style.cursor = 'pointer';
      formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
      formBtn.setAttribute('disabled', '');
    })
    .catch(error => {
      console.error('Form submission error:', error);

      // Show error popup
      showPopupMessage('Failed to send message. Please try again or contact me directly.', false);

      // Reset button
      formBtn.style.opacity = '1';
      formBtn.style.cursor = 'pointer';
      formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
    });
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("article[data-page]");

// Function to activate a specific page
function activatePage(targetPage) {
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].dataset.page === targetPage) {
      pages[i].classList.add("active");
      navigationLinks[i].classList.add("active");
    } else {
      pages[i].classList.remove("active");
      navigationLinks[i].classList.remove("active");
    }
  }
  // Update URL hash and save to localStorage
  window.location.hash = targetPage;
  localStorage.setItem('activeTab', targetPage);
  window.scrollTo(0, 0);
}

// Initialize page based on URL hash or localStorage
function initializePage() {
  let targetPage = null;

  // Check URL hash first (priority)
  if (window.location.hash) {
    targetPage = window.location.hash.substring(1); // Remove #
  }

  // If no hash, check localStorage
  if (!targetPage) {
    targetPage = localStorage.getItem('activeTab');
  }

  // If no saved tab, default to 'about'
  if (!targetPage) {
    targetPage = 'about';
  }

  // Validate that the target page exists
  const pageExists = Array.from(pages).some(page => page.dataset.page === targetPage);
  if (!pageExists) {
    targetPage = 'about';
  }

  activatePage(targetPage);
}

// Add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase();
    activatePage(targetPage);
  });
}

// Handle browser back/forward buttons
window.addEventListener('hashchange', function() {
  const targetPage = window.location.hash.substring(1) || 'about';
  activatePage(targetPage);
});

// Sticky navigation functionality
function handleStickyNavigation() {
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateNavbar() {
    const scrollY = window.scrollY;

    // Add sticky class when scrolling down past 100px
    if (scrollY > 100) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializePage();
  handleStickyNavigation();
});