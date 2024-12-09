import { json, error, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { watchlist } from '$lib/server/db/schema';
import { parse } from 'cookie';  // To parse cookies from the request
import { verifySession } from '$lib/server/session';  // Session verification
import { eq } from 'drizzle-orm';  // Import `eq` from drizzle-orm


export const POST: RequestHandler = async ({ request }) => {
  try {
    // Parse the cookies from the request
    const cookies = parse(request.headers.get('cookie') || ''); 
    const sessionToken = cookies.session;

    if (!sessionToken) {
      return json({ error: 'Unauthorized' }, { status: 401 }); // Session token not found
    }

    // Verify the session using the session token
    const user = await verifySession(sessionToken);

    if (!user) {
      return json({ error: 'Unauthorized' }, { status: 401 }); // Session invalid or expired
    }

    // Parse the body for the watchlist data
    const { title, description, imageUrl} = await request.json();

    if (!title || !description) {
      return json({ error: 'Title and description are required' }, { status: 400 });
    }

    // Insert the new watchlist item
    await db.insert(watchlist).values({
      user_id: user.id,
      title,
      description,
      imageUrl
    });

    return json({ message: 'Watchlist item added successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error adding to watchlist:', err);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};

export const GET: RequestHandler = async ({ request }) => {
  try {
    // Parse the cookies from the request
    const cookies = parse(request.headers.get('cookie') || '');
    const sessionToken = cookies.session;

    if (!sessionToken) {
      return json({ error: 'Unauthorized' }, { status: 401 }); // Session token not found
    }

    // Verify the session using the session token
    const user = await verifySession(sessionToken);

    if (!user) {
      return json({ error: 'Unauthorized' }, { status: 401 }); // Session invalid or expired
    }

    // Extract userId from query params using URLSearchParams
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId || Number(userId) !== user.id) {
      return json({ error: 'Unauthorized' }, { status: 401 }); // Ensure the userId matches the logged-in user
    }

    // Fetch the watchlist for the logged-in user
    const userWatchlist = await db
      .select()
      .from(watchlist)
      .where(eq(watchlist.user_id, user.id));

    return json(userWatchlist, { status: 200 });
  } catch (err) {
    console.error('Error retrieving watchlist:', err);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};
