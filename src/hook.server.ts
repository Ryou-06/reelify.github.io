// src/hooks.server.ts
import { handle as authHandle } from '$lib/hooks/auth';
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(authHandle, async ({ event, resolve }) => {
  const auth = await event.locals.auth?.();

  // Add `/` as a protected route
  const protectedRoutes = ['/protected', '/watchlist']; // Add other protected routes here
  if (protectedRoutes.some(route => event.url.pathname === route) && !auth) {
    throw redirect(302, '/auth'); // Redirect to login if not authenticated
  }

  return resolve(event);
});
