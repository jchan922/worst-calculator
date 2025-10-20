import type { PageServerLoad } from './$types';

/**
 * Server-side route handler
 * This runs on the SERVER before the page loads
 * This is closer to a "traditional" MVC controller
 */
export const load: PageServerLoad = async ({ params, url, fetch }) => {
  // This is where you'd do traditional "controller" things:
  // - Database queries
  // - Authentication checks
  // - Business logic
  // - API calls

  console.log('Server-side handler executed for /calculator route');

  return {
    pageTitle: 'Calculator',
    timestamp: new Date().toISOString(),
    // Any data returned here is passed to +page.svelte as `data` prop
  };
};
