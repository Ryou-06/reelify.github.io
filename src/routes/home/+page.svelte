<script lang="ts">
    import { onMount } from 'svelte';
    let movies: { id: number, title: string, description: string, imageUrl: string }[] = [];
  
    onMount(async () => {
      try {
        // Fetch the list of movies
        const response = await fetch('/api/movies');
        if (response.ok) {
          movies = await response.json();
        } else {
          console.error('Failed to fetch movies');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    });
  
    const addToWatchlist = async (movieId: number, title: string, description: string, imageUrl: string) => {
  try {
    // Fetch the current session
    const session = await fetch('/api/auth/session').then((res) => res.json());
    const userId = session?.user?.id; // Get user ID from session

    if (!userId) {
      alert('Failed to retrieve user session. Please log in again.');
      return;
    }

    // Add movie to the watchlist
    const response = await fetch('/api/watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, title, description, imageUrl }),
    });

    if (response.ok) {
      alert('Movie added to watchlist');
    } else {
      alert('Failed to add movie to watchlist');
    }
  } catch (error) {
    console.error('Error adding to watchlist:', error);
  }
};


  </script>
  
  <h1 class="text-4xl font-bold text-center my-16">Movie List</h1>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 mb-16">
    {#each movies as movie}
      <div class="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <img src={movie.imageUrl} alt={movie.title} class="w-full h-64 object-cover" />
        <div class="p-4">
          <h2 class="text-xl font-semibold">{movie.title}</h2>
          <p class="text-gray-600 text-sm mt-2">{movie.description}</p>
          <button
            on:click={() => addToWatchlist(movie.id, movie.title, movie.description, movie.imageUrl)} 
            class="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add to Watchlist
          </button>
        </div>
      </div>
    {/each}
  </div>
  