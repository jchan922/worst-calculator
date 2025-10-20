# Deployment

## Overview

This project is configured to deploy to **Cloudflare Pages** with automatic CI/CD through GitHub integration. This document describes the deployment process and configuration.

---

## Current Deployment: Cloudflare Pages

**Difficulty**: ⭐ Easy
**Cost**: Free (unlimited bandwidth on free tier)
**Setup Time**: 5-10 minutes

### Why Cloudflare Pages?
- **Global CDN** with edge computing for fast worldwide performance
- **Unlimited bandwidth** on free tier
- Fast builds and deployments
- Cloudflare's security features included (DDoS protection, SSL)
- Excellent SvelteKit support with `@sveltejs/adapter-cloudflare`
- Git integration with automatic deployments
- Preview deployments for pull requests

### Configuration Files

The project includes the following configuration for Cloudflare Pages:

**`svelte.config.js`**
```javascript
import adapter from '@sveltejs/adapter-cloudflare';

const config = {
  kit: {
    adapter: adapter()
  }
};
```

**`wrangler.toml`**
```toml
name = "worst-calculator"
compatibility_date = "2024-01-01"
pages_build_output_dir = ".svelte-kit/cloudflare"
```

**`.node-version`**
```
20
```

### Initial Setup

1. **Prerequisites**
   - Code pushed to GitHub repository: `https://github.com/jchan922/worst-calculator`
   - Cloudflare account (free): [dash.cloudflare.com](https://dash.cloudflare.com)

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Click **"Workers & Pages"** in the left sidebar
   - Click **"Create application"**
   - Select the **"Pages"** tab
   - Click **"Connect to Git"**

3. **Connect Your Repository**
   - Select **GitHub** as your Git provider
   - Authorize Cloudflare to access your GitHub account (if needed)
   - Select the repository: **`jchan922/worst-calculator`**
   - Click **"Begin setup"**

4. **Configure Build Settings**

   Set the following build configuration:

   - **Project name**: `worst-calculator` (or your preferred name)
   - **Production branch**: `master`
   - **Framework preset**: `SvelteKit`
   - **Build command**: `npm run build`
   - **Build output directory**: `.svelte-kit/cloudflare`

   Click **"Save and Deploy"**

5. **Deployment Complete**
   - Cloudflare will build and deploy your app (typically 1-2 minutes)
   - Once complete, you'll receive a live URL like: `https://worst-calculator.pages.dev`

### Automatic CI/CD

Once configured, deployments happen automatically:

- **Production Deployments**: Every push to `master` branch triggers automatic rebuild and deployment
- **Preview Deployments**: Every pull request gets a unique preview URL for testing
- **Build Status**: GitHub commits show build status via Cloudflare Pages integration
- **Rollback**: Easy rollback to previous deployments via Cloudflare dashboard

### Environment Variables

Add environment variables in Cloudflare Dashboard:
- Navigate to: **Workers & Pages** → **Your Project** → **Settings** → **Environment Variables**
- Currently, no environment variables are required
- Future variables (when adding features):
  - `PUBLIC_APP_NAME`
  - `PUBLIC_APP_VERSION`
  - OAuth secrets (Phase 2: Authentication)

### Custom Domain

To add a custom domain:
1. Go to **Workers & Pages** → **Your Project** → **Custom domains**
2. Click **"Set up a custom domain"**
3. Enter your domain name
4. Follow DNS configuration instructions
5. Cloudflare automatically provisions SSL certificate
6. Changes propagate globally within minutes

---

## Local Testing Before Deployment

Before deploying to Cloudflare, always test locally:

```bash
# Install dependencies
npm install

# Run type checking
npm run check

# Build the project
npm run build

# Preview the production build locally
npm run preview
```

Visit `http://localhost:4173` to test the production build locally.

---

## Deployment Checklist

Before deploying, ensure:

- [ ] All dependencies are installed: `npm install`
- [ ] TypeScript checks pass: `npm run check`
- [ ] Build succeeds locally: `npm run build`
- [ ] Preview works locally: `npm run preview`
- [ ] Code is pushed to GitHub
- [ ] `.env` files are in `.gitignore` (never commit secrets!)

---

## Monitoring & Analytics

### Cloudflare Web Analytics (Recommended)

Cloudflare provides free, privacy-first web analytics:

1. Go to **Workers & Pages** → **Your Project** → **Analytics**
2. View real-time traffic, performance metrics, and geographic distribution
3. No tracking scripts needed - built into Cloudflare's infrastructure
4. GDPR compliant, no cookie banner required

### Error Tracking (Optional)

For production error tracking, consider **Sentry**:

```bash
npm install @sentry/sveltekit
```

- Free tier: 5,000 events/month
- Automatic error reporting
- Source maps support
- Performance monitoring

Configuration: [docs.sentry.io/platforms/javascript/guides/sveltekit](https://docs.sentry.io/platforms/javascript/guides/sveltekit/)

---

## Troubleshooting

### Build Fails on Deployment

**Check locally first:**
```bash
npm run build
```

**Common issues:**
- Missing dependencies: Run `npm install`
- TypeScript errors: Run `npm run check`
- Sass compilation errors: Check for deprecated syntax
- Adapter mismatch: Verify `svelte.config.js` uses `@sveltejs/adapter-cloudflare`

### Preview Works But Production Fails

**Check adapter configuration:**
- Ensure `@sveltejs/adapter-cloudflare` is installed
- Verify `svelte.config.js` imports and uses the correct adapter
- Check build output directory matches: `.svelte-kit/cloudflare`
- Review build logs in Cloudflare Dashboard

### Environment Variables Not Working

- Environment variables must be prefixed with `PUBLIC_` to be accessible in client-side code
- Server-side only variables don't need the prefix
- Restart deployment after adding/updating variables
- Check variable names match exactly (case-sensitive)

---

## Future Enhancements

### Phase 2: Authentication
When adding OAuth authentication:
- Store OAuth secrets as environment variables in Cloudflare
- Use Cloudflare Workers for OAuth callbacks
- Consider Cloudflare Access for additional security

### Phase 3-4: Database Integration
For data persistence:
- **Cloudflare D1**: SQLite database at the edge (beta, free tier available)
- **Cloudflare KV**: Key-value storage for simple data
- **Cloudflare Durable Objects**: For real-time features
- **External**: Supabase or PlanetScale for PostgreSQL/MySQL

---

## Quick Reference

**Repository**: `https://github.com/jchan922/worst-calculator`

**Build Command**: `npm run build`

**Build Output**: `.svelte-kit/cloudflare`

**Production Branch**: `master`

**Cloudflare Dashboard**: [dash.cloudflare.com](https://dash.cloudflare.com)

---

## Need Help?

- **Cloudflare Pages Docs**: [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages/)
- **SvelteKit Adapter Docs**: [kit.svelte.dev/docs/adapter-cloudflare](https://kit.svelte.dev/docs/adapter-cloudflare)
- **Community Support**: [community.cloudflare.com](https://community.cloudflare.com/)
