# Technology Stack

## Framework

**SvelteKit** - Version 2.x or latest stable

**Rationale**:

- Native hot module replacement (HMR) for instant updates
- Built-in server-side rendering and routing
- Excellent middleware support via hooks
- Natural file-based routing structure
- Superior TypeScript integration
- Better suited for SPAs with authentication than Astro

---

## Styling

**SCSS/Sass** - Preprocessor for enhanced CSS capabilities

**Rationale**:

- Variables and mixins for reusable styles
- Nesting for better organization
- More powerful than plain CSS
- No utility class dependencies like Tailwind

---

## Language

**TypeScript** - For type safety and better developer experience

---

## Package Manager

npm

---

## Hot Reload Configuration

SvelteKit includes Vite's HMR by default. No additional configuration needed.

**Vite config** (`vite.config.ts`):

```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: 5173,
    strictPort: false,
    hmr: {
      overlay: true,
    },
  },
});
```

---

## References

### Documentation

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Svelte Documentation](https://svelte.dev/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SCSS Documentation](https://sass-lang.com/documentation)

### Design Patterns

- MVC Architecture
- Repository Pattern (for future data layer)
- Factory Pattern (for calculator operations)

---

## Glossary

- **MVC**: Model-View-Controller architectural pattern
- **HMR**: Hot Module Replacement
- **SSR**: Server-Side Rendering
- **OAuth**: Open Authorization standard
- **JWT**: JSON Web Token
