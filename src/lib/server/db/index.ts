// src/lib/db/index.ts
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { env } from '$env/dynamic/private';

// Ensure the DATABASE_URL is set in your environment
if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

// Create the SQLite database client
const client = new Database(env.DATABASE_URL);

// Export the Drizzle ORM instance
export const db = drizzle(client);
