// src/routes/api/auth/session/+server.ts
import { json, type RequestHandler } from '@sveltejs/kit';
import { parse } from 'cookie'; 
import { verifySession } from '$lib/server/session';

export const GET: RequestHandler = async ({ request }) => {
  console.log('Incoming request to /api/auth/session');
  
  try {
    const cookies = parse(request.headers.get('cookie') || ''); 
    console.log('Cookies received:', cookies);

    const sessionToken = cookies.session; // Look specifically for the 'session' cookie

    if (!sessionToken) {
      console.warn('No session token found in cookies');
      return json({ user: null }, { status: 401 }); 
    }

    const user = await verifySession(sessionToken);

    if (!user) {
      console.warn('Session token invalid or expired');
      return json({ user: null }, { status: 401 });
    }

    console.log('Session verified for user:', user);
    return json({ user }, { status: 200 });
  } catch (err) {
    console.error('Error retrieving session:', err);
    return json({ error: 'Failed to retrieve session' }, { status: 500 });
  }
};
