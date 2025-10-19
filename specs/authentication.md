# Authentication Strategy (Future)

## Providers

- **Google OAuth 2.0**
- **Apple Sign-In**

---

## Implementation Approach

### Libraries

- `@auth/sveltekit` - Official SvelteKit authentication
- Provider-specific SDKs

### Session Management

- Server-side sessions using cookies
- JWT tokens for API authentication
- Session stored in `event.locals.user`

---

## Protected Routes

```typescript
// /src/routes/account/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, '/login');
  }

  return {
    user: locals.user,
  };
};
```

---

## Middleware Hook

```typescript
// /src/hooks.server.ts
const authMiddleware: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get('session');

  if (sessionToken) {
    const user = await validateSession(sessionToken);
    event.locals.user = user;
  }

  return resolve(event);
};
```

---

## Implementation Timeline

This authentication strategy is planned for **Phase 2** of the project. See [features.md](./features.md) for the full roadmap.
