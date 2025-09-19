// Contact Form Integration Options
// Choose one of these options for your contact form

// Option 1: Formspree (Current - Already Set Up)
// URL: https://formspree.io/f/xpzgkqyv
// Features: Direct email delivery, spam protection, file uploads
// Cost: Free for 50 submissions/month
// Setup: Already working in your current form

// Option 2: EmailJS (Email + Multiple Services)
// Add this script to your HTML head:
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

const emailJSIntegration = {
  init: function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Get from emailjs.com
  },

  sendEmail: function(formData) {
    const templateParams = {
      from_name: formData.fullname,
      from_email: formData.email,
      message: formData.message,
      to_email: "your-email@example.com" // Your email
    };

    return emailjs.send(
      "YOUR_SERVICE_ID", // Gmail, Outlook, etc.
      "YOUR_TEMPLATE_ID",
      templateParams
    );
  },

  // Can also send to Slack
  sendToSlack: function(formData) {
    const slackTemplate = {
      from_name: formData.fullname,
      message: `New contact form submission from ${formData.fullname}: ${formData.message}`,
      webhook_url: "YOUR_SLACK_WEBHOOK"
    };

    return emailjs.send("slack_service", "slack_template", slackTemplate);
  }
};

// Option 3: Netlify Forms (If hosted on Netlify)
// Just add data-netlify="true" to your form:
// <form data-netlify="true" method="POST">

// Option 4: Custom Backend with Multiple Notifications
const customBackendIntegration = {
  // Send to your custom endpoint
  sendMessage: async function(formData) {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    return response.json();
  }
};

// Option 5: Discord Webhook Integration
const discordIntegration = {
  sendToDiscord: async function(formData) {
    const webhookURL = "YOUR_DISCORD_WEBHOOK_URL";

    const embed = {
      title: "📨 New Contact Form Submission",
      color: 0xffdb70,
      fields: [
        {
          name: "👤 Name",
          value: formData.fullname,
          inline: true
        },
        {
          name: "📧 Email",
          value: formData.email,
          inline: true
        },
        {
          name: "💬 Message",
          value: formData.message,
          inline: false
        }
      ],
      timestamp: new Date().toISOString()
    };

    return fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed]
      })
    });
  }
};

// Option 6: Telegram Bot Integration
const telegramIntegration = {
  sendToTelegram: async function(formData) {
    const botToken = "YOUR_BOT_TOKEN";
    const chatId = "YOUR_CHAT_ID";

    const message = `
📨 *New Contact Form Submission*

👤 *Name:* ${formData.fullname}
📧 *Email:* ${formData.email}
💬 *Message:*
${formData.message}
    `;

    return fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });
  }
};

// Enhanced Form Handler (Multi-platform)
class ContactFormHandler {
  constructor(options = {}) {
    this.options = {
      email: true,
      slack: false,
      discord: false,
      telegram: false,
      whatsapp: false,
      ...options
    };
  }

  async handleSubmit(formData) {
    const results = [];

    try {
      // Always send email (Formspree)
      if (this.options.email) {
        results.push(await this.sendEmail(formData));
      }

      // Send to Slack if enabled
      if (this.options.slack) {
        results.push(await this.sendToSlack(formData));
      }

      // Send to Discord if enabled
      if (this.options.discord) {
        results.push(await discordIntegration.sendToDiscord(formData));
      }

      // Send to Telegram if enabled
      if (this.options.telegram) {
        results.push(await telegramIntegration.sendToTelegram(formData));
      }

      return { success: true, results };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async sendEmail(formData) {
    // Use current Formspree setup
    return fetch('https://formspree.io/f/xpzgkqyv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
  }

  async sendToSlack(formData) {
    const webhookURL = "YOUR_SLACK_WEBHOOK_URL";

    const slackMessage = {
      text: `📨 New contact form submission`,
      attachments: [
        {
          color: "#ffdb70",
          fields: [
            {
              title: "Name",
              value: formData.fullname,
              short: true
            },
            {
              title: "Email",
              value: formData.email,
              short: true
            },
            {
              title: "Message",
              value: formData.message,
              short: false
            }
          ]
        }
      ]
    };

    return fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage)
    });
  }
}

// Initialize the form handler
// const contactHandler = new ContactFormHandler({
//   email: true,
//   slack: true,
//   discord: false,
//   telegram: false
// });

// Example usage in your existing form
// document.querySelector('[data-form]').addEventListener('submit', async (e) => {
//   e.preventDefault();
//
//   const formData = {
//     fullname: e.target.fullname.value,
//     email: e.target.email.value,
//     message: e.target.message.value
//   };
//
//   const result = await contactHandler.handleSubmit(formData);
//
//   if (result.success) {
//     // Show success message
//     console.log('Message sent successfully!');
//   } else {
//     // Show error message
//     console.error('Failed to send message:', result.error);
//   }
// });