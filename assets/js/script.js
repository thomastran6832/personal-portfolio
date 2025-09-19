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

// Slack integration
const SLACK_WEBHOOK_URL = window.SLACK_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL;

async function sendToSlack(formData) {
  const messageText = `🔔 *New Portfolio Contact Form Submission*

👤 *Name:* ${formData.fullname}
📧 *Email:* ${formData.email || "Not provided"}
💬 *Message:*
${formData.message}

⏰ *Received:* ${new Date().toLocaleString()}`;

  const slackMessage = {
    text: messageText
  };

  try {
    console.log('Sending to Slack:', slackMessage); // Debug log
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage)
    });

    console.log('Slack response status:', response.status); // Debug log
    if (!response.ok) {
      console.error('Slack response error:', await response.text());
    }

    return response.ok;
  } catch (error) {
    console.error('Failed to send to Slack:', error);
    return false;
  }
}

// Enhanced form submission handler
if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {
      fullname: formData.get('fullname'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    // Disable submit button during submission
    formBtn.style.opacity = '0.7';
    formBtn.style.cursor = 'not-allowed';
    formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';

    try {
      // Send to Formspree (email)
      const emailResponse = await fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      // Send to Slack
      const slackSuccess = await sendToSlack(data);

      if (emailResponse.ok) {
        // Success message
        formBtn.style.background = 'linear-gradient(45deg, #4caf50, #45a049)';
        formBtn.innerHTML = '<ion-icon name="checkmark-circle"></ion-icon><span>Message Sent!</span>';

        // Reset form
        this.reset();
        formBtn.setAttribute("disabled", "");

        // Show success notification
        if (slackSuccess) {
          console.log('✅ Message sent to both Email and Slack');
        } else {
          console.log('✅ Message sent to Email (Slack failed)');
        }

        // Reset button after 3 seconds
        setTimeout(() => {
          formBtn.style.background = 'linear-gradient(45deg, #ffdb70, #ffc107)';
          formBtn.style.opacity = '1';
          formBtn.style.cursor = 'pointer';
          formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
        }, 3000);

      } else {
        throw new Error('Email submission failed');
      }

    } catch (error) {
      // Error message
      formBtn.style.background = 'linear-gradient(45deg, #f44336, #d32f2f)';
      formBtn.innerHTML = '<ion-icon name="close-circle"></ion-icon><span>Failed to Send</span>';

      console.error('❌ Failed to send message:', error);

      // Reset button after 3 seconds
      setTimeout(() => {
        formBtn.style.background = 'linear-gradient(45deg, #ffdb70, #ffc107)';
        formBtn.style.opacity = '1';
        formBtn.style.cursor = 'pointer';
        formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
      }, 3000);
    }
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

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializePage();
});