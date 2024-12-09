import { sqliteTable, text, integer, primaryKey  } from 'drizzle-orm/sqlite-core';

// Users Table
export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  fullname: text('fullname'),
  email: text('email').unique(),
  password: text('password')
});

// Watchlist Table
export const watchlist = sqliteTable('watchlist', {
  id: integer('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id), // Foreign key to users table
  description: text('description'),
  title: text('title'),
  imageUrl: text('imageUrl')
}); 

export const sessions = sqliteTable('sessions', {
	id: integer('id').primaryKey(), // Primary key, auto-incremented automatically
	userId: integer('userId').notNull(), // Reference to the user
	sessionToken: text('sessionToken').notNull(),
	expiresAt: text('expiresAt').notNull(), // Use text to store datetime
  });
