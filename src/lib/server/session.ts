// src/lib/server/session.ts
import { serialize } from 'cookie';
import { db } from '$lib/server/db'; // Your database setup
import { sessions, users } from '$lib/server/db/schema'; // Import both sessions and users schema
import { nanoid } from 'nanoid'; // A secure unique ID generator
import { eq } from 'drizzle-orm'; // Import eq from drizzle-orm

// Create a session for the user
export const createSession = async (userId: number) => {
  try {
    const sessionToken = nanoid(); // Generate a secure unique session token
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1); // Session expiry in one year

    // Insert the session into the database
    await db.insert(sessions).values({
      userId,
      sessionToken,
      expiresAt: expires.toISOString(),
    });

    // Create a session cookie for the client
    return serialize('session', sessionToken, {
      httpOnly: true,
      path: '/',
      expires,
      secure: process.env.NODE_ENV === 'production', // Only secure in production
      sameSite: 'strict', // Improve security
    });
  } catch (err) {
    console.error('Error creating session:', err);
    throw new Error('Failed to create session');
  }
};

// Verify the session based on the session token
export const verifySession = async (sessionToken: string) => {
  try {
    const session = await db
      .select()
      .from(sessions)
      .where(eq(sessions.sessionToken, sessionToken))
      .limit(1);

    if (session.length === 0) {
      return null;
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session[0].userId))
      .limit(1);

    return user.length > 0 ? user[0] : null;
  } catch (err) {
    console.error('Error verifying session:', err);
    throw new Error('Failed to verify session');
  }
};
