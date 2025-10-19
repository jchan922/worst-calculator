# Deployment Options

## Overview

This document outlines deployment options optimized for ease of use and minimal DevOps knowledge. All options provide one-click or near-zero-config deployment with automatic CI/CD.

---

## Recommended: Vercel (Best for SvelteKit)

**Difficulty**: P Easiest
**Cost**: Free tier available
**Setup Time**: 5 minutes

### Why Vercel?
- **Zero-config** SvelteKit deployment
- Built by the creators of Next.js, excellent framework support
- Automatic HTTPS, CDN, and edge functions
- Git integration with automatic deployments
- Preview deployments for every pull request
- Generous free tier

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel auto-detects SvelteKit - click "Deploy"
   - Done! Your app is live

3. **Automatic CI/CD**
   - Every push to `main` ’ automatic production deployment
   - Every PR ’ automatic preview deployment with unique URL
   - No configuration files needed

### Environment Variables
Add in Vercel dashboard under Settings ’ Environment Variables:
- `PUBLIC_APP_NAME`
- `PUBLIC_APP_VERSION`
- Future: OAuth secrets (when adding authentication)

### Custom Domain
- Add custom domain in Vercel dashboard (Settings ’ Domains)
- Vercel automatically provisions SSL certificate
- DNS setup is guided and simple

---

## Alternative: Netlify

**Difficulty**: P Very Easy
**Cost**: Free tier available
**Setup Time**: 5-10 minutes

### Why Netlify?
- Excellent SvelteKit support with `@sveltejs/adapter-netlify`
- Built-in CI/CD and previews
- Form handling and serverless functions
- Split testing and analytics
- Great documentation

### Deployment Steps

1. **Install Netlify Adapter**
   ```bash
   npm install -D @sveltejs/adapter-netlify
   ```

2. **Update svelte.config.js**
   ```javascript
   import adapter from '@sveltejs/adapter-netlify';

   const config = {
     kit: {
       adapter: adapter()
     }
   };
   ```

3. **Deploy via Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" ’ "Import from Git"
   - Connect GitHub repository
   - Build settings auto-detected:
     - Build command: `npm run build`
     - Publish directory: `build`
   - Click "Deploy"

4. **Automatic CI/CD**
   - Push to `main` ’ production deployment
   - PRs ’ preview deployments
   - Optional: `netlify.toml` for advanced config (not required)

### Optional: netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Alternative: Cloudflare Pages

**Difficulty**: PP Easy
**Cost**: Free tier available
**Setup Time**: 10 minutes

### Why Cloudflare Pages?
- Global CDN with edge computing
- Unlimited bandwidth on free tier
- Fast builds and deployments
- Cloudflare's security features included
- Great for international users

### Deployment Steps

1. **Install Cloudflare Adapter**
   ```bash
   npm install -D @sveltejs/adapter-cloudflare
   ```

2. **Update svelte.config.js**
   ```javascript
   import adapter from '@sveltejs/adapter-cloudflare';

   const config = {
     kit: {
       adapter: adapter()
     }
   };
   ```

3. **Deploy via Cloudflare**
   - Go to [pages.cloudflare.com](https://pages.cloudflare.com)
   - Click "Create a project" ’ "Connect to Git"
   - Select repository
   - Framework preset: SvelteKit
   - Build command: `npm run build`
   - Build output: `.svelte-kit/cloudflare`
   - Click "Save and Deploy"

4. **Automatic CI/CD**
   - Git push triggers automatic deployment
   - Preview deployments for branches
   - Analytics included

---

## Alternative: Railway

**Difficulty**: PP Easy
**Cost**: $5/month minimum (trial available)
**Setup Time**: 5 minutes

### Why Railway?
- One-click Node.js deployments
- Built-in database support (PostgreSQL, MySQL, etc.)
- Great for apps that need a database
- Simple pricing (pay for what you use)
- Excellent developer experience

### Deployment Steps

1. **Use Node Adapter** (default)
   ```bash
   npm install -D @sveltejs/adapter-node
   ```

2. **Update svelte.config.js**
   ```javascript
   import adapter from '@sveltejs/adapter-node';

   const config = {
     kit: {
       adapter: adapter()
     }
   };
   ```

3. **Deploy via Railway**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" ’ "Deploy from GitHub repo"
   - Select repository
   - Railway auto-detects Node.js
   - Environment variables auto-configured
   - Click "Deploy"

4. **Add Database (Optional)**
   - Click "New" ’ "Database" ’ "PostgreSQL"
   - Connection string automatically injected
   - Perfect for future Phase 4 (data persistence)

---

## Comparison Table

| Platform | Difficulty | Free Tier | CI/CD | Preview Deploys | Database | Best For |
|----------|-----------|-----------|-------|----------------|----------|----------|
| **Vercel** | P Easiest |  Generous |  Auto |  Yes |   External | SvelteKit apps, static sites |
| **Netlify** | P Very Easy |  Good |  Auto |  Yes |   External | Forms, serverless functions |
| **Cloudflare** | PP Easy |  Best |  Auto |  Yes |   D1/KV | Global distribution, edge |
| **Railway** | PP Easy |   Trial only |  Auto |  Yes |  Built-in | Apps needing databases |

---

## Deployment Checklist

Before deploying, ensure:

- [ ] All environment variables are documented in `.env.example`
- [ ] Build succeeds locally: `npm run build`
- [ ] Preview works locally: `npm run preview`
- [ ] Tests pass: `npm test`
- [ ] Code is pushed to GitHub/GitLab
- [ ] `.env` is in `.gitignore` (never commit secrets!)

---

## Post-Deployment

### Monitoring & Analytics

**Vercel Analytics** (if using Vercel)
```bash
npm install @vercel/analytics
```

```typescript
// src/routes/+layout.svelte
import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';

if (!dev) inject();
```

**Alternative: Simple Analytics**
- Privacy-friendly
- GDPR compliant
- No cookie banner needed
- $9/month

**Free Option: Cloudflare Web Analytics**
- No tracking
- Privacy-first
- Works with any host

### Error Tracking

**Sentry** (Recommended for production)
```bash
npm install @sentry/sveltekit
```

- Free tier: 5,000 events/month
- Automatic error reporting
- Source maps support
- Performance monitoring

### Uptime Monitoring

**Free Options:**
- [UptimeRobot](https://uptimerobot.com) - 50 monitors free
- [StatusCake](https://www.statuscake.com) - Free tier available
- [Better Uptime](https://betteruptime.com) - Beautiful status pages

---

## CI/CD Enhancements (Optional)

### GitHub Actions for Testing

Create `.github/workflows/test.yml`:

```yaml
name: Test

on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm install
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

This runs automatically on every PR, ensuring code quality before deployment.

### Preview Comments on PRs

Most platforms (Vercel, Netlify, Cloudflare) automatically comment on PRs with preview URLs. No configuration needed!

---

## Recommendation for This Project

### Phase 1 (MVP - Current)
**Use: Vercel**
- Zero config
- Free tier sufficient
- Automatic previews
- Perfect for SvelteKit
- Easiest to set up

### Phase 2 (Adding Auth)
**Stay with Vercel** or consider **Netlify**
- Both handle OAuth redirects well
- Environment variables easy to manage
- Vercel Edge Functions for auth middleware
- Netlify Functions for OAuth handlers

### Phase 3-4 (Database + Persistence)
**Consider: Railway or Vercel + External DB**
- Railway: Built-in PostgreSQL (easiest)
- Vercel + Supabase (PostgreSQL as a service)
- Vercel + PlanetScale (MySQL as a service)
- Cloudflare + D1 (SQLite at edge)

---

## Quick Start: Deploy Now

**Fastest path to production:**

```bash
# 1. Build locally to verify
npm run build
npm run preview

# 2. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push

# 3. Go to vercel.com
# 4. Click "Import Project"
# 5. Select your repo
# 6. Click "Deploy"
# 7. Done! You're live =€
```

Your app will be at: `https://your-project.vercel.app`

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
- Environment variables: Check platform dashboard

### Preview Works But Production Fails

**Check adapter configuration:**
- Ensure correct adapter installed for platform
- Verify `svelte.config.js` uses correct adapter
- Check build output directory matches platform settings

### Need Help?

- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **SvelteKit**: [kit.svelte.dev/docs/adapters](https://kit.svelte.dev/docs/adapters)
