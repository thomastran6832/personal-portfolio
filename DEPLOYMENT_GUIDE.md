# 🚀 Portfolio Deployment Guide

## GitHub Secrets Setup

### Step 1: Go to Your GitHub Repository
1. Navigate to your GitHub repository
2. Click **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**

### Step 2: Add Slack Webhook Secret
1. Click **"New repository secret"**
2. **Name**: `SLACK_WEBHOOK_URL`
3. **Secret**: `https://hooks.slack.com/services/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`
4. Click **"Add secret"**

### Step 3: Enable GitHub Pages
1. Go to **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `gh-pages` (will be created automatically)
4. Click **Save**

## Local Development

### For Local Testing:
```bash
# Edit env-loader.js and replace the placeholder with your actual URL
# Or set it in your browser console:
window.SLACK_WEBHOOK_URL = 'your-webhook-url-here';
```

## Files Overview

- ✅ **env-loader.js**: Loads environment variables securely
- ✅ **.env.example**: Template for environment variables
- ✅ **.env.local**: Local development secrets (not committed)
- ✅ **.gitignore**: Excludes secret files from git
- ✅ **.github/workflows/deploy.yml**: Auto-deployment to GitHub Pages

## Security Features

- 🔒 **No hardcoded secrets** in the repository
- 🔒 **Environment-based configuration**
- 🔒 **Automatic secret injection** during deployment
- 🔒 **Local development isolation**

## Deployment Process

1. **Push code** to main branch
2. **GitHub Actions** automatically:
   - Replaces placeholders with actual secrets
   - Deploys to GitHub Pages
3. **Your portfolio** is live with working Slack integration!

## Troubleshooting

### Slack Not Working?
1. Check GitHub Secrets are set correctly
2. Verify Slack webhook URL is valid
3. Check browser console for errors
4. Ensure GitHub Pages is enabled

### Local Development
- Open browser console and check for environment logs
- Manually set `window.SLACK_WEBHOOK_URL` for testing