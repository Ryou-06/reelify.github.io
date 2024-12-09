import { json, type RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { createSession } from '$lib/server/session';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response('Email and password are required', { status: 400 });
    }

    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (user.length === 0 || !user[0].password) {
      // If user doesn't exist or password is null
      return new Response('Invalid email or password', { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password as string); // Use `as string` after null check

    if (!isPasswordValid) {
      return new Response('Invalid email or password', { status: 400 });
    }

    // Create a session and set the cookie
    const sessionCookie = await createSession(user[0].id);

    return new Response(
      JSON.stringify({
        message: 'Login successful',
        user: user[0],
        redirectTo: '/home',
      }),
      {
        status: 200,
        headers: {
          'Set-Cookie': sessionCookie, // Ensure the cookie is set
        },
      }
    );
  } catch (err) {
    console.error('Login error:', err);
    return new Response('Internal server error', { status: 500 });
  }
};
