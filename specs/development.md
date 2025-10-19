# Development Guide

## Prerequisites

- Node.js 18+ or Node.js 20+
- npm

---

## Installation Steps

1. **Clone/Create Project**

```bash
npm create svelte@latest calculator-app
cd calculator-app
```

2. **Select Options**

- Skeleton project: Yes
- TypeScript: Yes
- ESLint: Yes
- Prettier: Yes
- Playwright: Optional
- Vitest: Yes

3. **Install Dependencies**

```bash
npm install
```

4. **Install SCSS Support**

```bash
npm add -D sass
```

5. **Install Additional Dependencies**

```bash
npm add -D @types/node
```

---

## Development Commands

```bash
# Start development server with hot reload
npm dev

# Start dev server and open in browser
npm dev --open

# Build for production
npm build

# Preview production build
npm preview

# Run tests
npm test

# Run linter
npm lint

# Format code
npm format
```

---

## Environment Configuration

### Environment Variables

**File**: `.env` (gitignored)

```bash
# Development
PUBLIC_APP_NAME=Calculator App
PUBLIC_APP_VERSION=1.0.0

# Future: Authentication
# GOOGLE_CLIENT_ID=your-client-id
# GOOGLE_CLIENT_SECRET=your-client-secret
# APPLE_CLIENT_ID=your-client-id
# APPLE_CLIENT_SECRET=your-client-secret

# Future: Database
# DATABASE_URL=postgresql://...
```

### Configuration File

**File**: `svelte.config.js`

```javascript
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    alias: {
      $lib: 'src/lib',
      $components: 'src/lib/components',
      $models: 'src/lib/models',
      $controllers: 'src/lib/controllers',
    },
  },
};

export default config;
```

---

## Deployment

### Build Output

```bash
npm build
```

Generates optimized production build in `build/` directory

### Deployment Targets

- **Vercel** (recommended for SvelteKit)
- **Netlify**
- **Cloudflare Pages**
- **Node.js server**

### Environment-Specific Configuration

- Development: Hot reload, verbose logging
- Production: Minified, optimized, minimal logging

---

## Performance Considerations

### Current Optimization

- Minimal JavaScript bundle size
- Component-scoped CSS
- Lazy loading for future routes
- Efficient reactivity with Svelte stores

### Future Optimization

- Route-based code splitting
- Image optimization for assets
- Service worker for offline capability
- Caching strategies

---

## Version Control

### Git Strategy

- Master branch: `master` (production-ready)
- Development branch: `dev`
- Feature branches: `feature/feature-name`
- Bugfix branches: `bugfix/bug-name`

### Commit Convention

Follow Conventional Commits:

```
feat: add multiplication operation
fix: resolve division by zero error
docs: update SPEC.md with auth strategy
style: format Calculator.ts with prettier
refactor: extract display logic to component
test: add unit tests for Calculator model
```

---

## Documentation Standards

### Code Comments

- Use JSDoc for functions and classes
- Explain "why" not "what" in comments
- Keep comments up-to-date with code changes

### README.md

Should include:

- Project description
- Setup instructions
- Development commands
- Architecture overview
- Contributing guidelines

### Changelog

Maintain CHANGELOG.md with versioned updates

---

## Success Metrics

### Developer Experience

- Hot reload time < 200ms
- Build time < 30 seconds
- Clear error messages
- Intuitive file structure

### Code Quality

- Test coverage > 80%
- Zero ESLint errors
- Consistent formatting
- Type safety with TypeScript

### User Experience

- First paint < 1 second
- Responsive on all devices
- Accessible (WCAG 2.1 AA)
- Intuitive interface
