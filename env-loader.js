// Environment Loader for Static Sites
// This script loads environment variables from different sources

(function() {
  'use strict';

  // Function to load environment variables
  function loadEnvironmentVariables() {
    // Priority order:
    // 1. GitHub Pages environment (if deployed)
    // 2. Netlify environment (if deployed)
    // 3. Local development environment
    // 4. Default values

    // GitHub Pages / Netlify environment variables are usually available as window variables
    if (window.location.hostname.includes('github.io') || window.location.hostname.includes('netlify.app')) {
      // In production, these should be set by GitHub Actions or Netlify
      window.SLACK_WEBHOOK_URL = window.SLACK_WEBHOOK_URL || '';
    } else {
      // Local development - you can set this manually for testing
      // In production, this will be replaced by build process
      window.SLACK_WEBHOOK_URL = 'REPLACE_WITH_ACTUAL_URL_IN_PRODUCTION';
    }

    // Log environment status (remove in production)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('Environment: Local Development');
      console.log('Slack Integration:', window.SLACK_WEBHOOK_URL ? 'Configured' : 'Not Configured');
    }
  }

  // Load environment variables when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadEnvironmentVariables);
  } else {
    loadEnvironmentVariables();
  }

})();