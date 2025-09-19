// Configuration file for environment variables
// This file will be loaded before the main script

// Check if we're in a browser environment
if (typeof window !== 'undefined') {
  // For client-side (browser) - these will be set by build process or hosting platform
  window.SLACK_WEBHOOK_URL = window.SLACK_WEBHOOK_URL || '';

  // You can add other environment variables here
  window.PORTFOLIO_CONFIG = {
    SLACK_WEBHOOK_URL: window.SLACK_WEBHOOK_URL,
    // Add other config variables as needed
  };
}

// For Node.js environment (if used in build process)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL || '',
  };
}