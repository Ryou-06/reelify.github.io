import { json, error } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { db } from '$lib/server/db'; // Import your DB connection
import { users } from '$lib/server/db/schema'; // Import your schema
import { eq } from 'drizzle-orm';  // Import `eq` from drizzle-orm

export const POST = async ({ request }) => {
  const { email, password, fullname } = await request.json();

  // Check if the user already exists
  const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existingUser.length > 0) {
    throw error(400, 'User already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the new user into the database
  const newUser = await db.insert(users).values({
    email,
    password: hashedPassword,
    fullname,
  });

  // Return success message and redirect URL
  return json({
    message: 'User created successfully',
    redirectTo: '/',  // Redirect to the login page after successful sign-up
  });
};
