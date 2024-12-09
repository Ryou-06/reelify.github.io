// src/routes/api/movies.ts
import { json } from '@sveltejs/kit';

const apiKey = '599dd95fcbb18dcd61d773af4b18d2cd';  // Your TMDb API key
const baseUrl = 'https://api.themoviedb.org/3';

export const GET = async () => {
  try {
    // Fetch popular movies from TMDb
    const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
    const data = await response.json();
    
    if (data.results) {
      // Map movie data to match the required format
      const movies = data.results.map((movie: any) => ({
        title: movie.title,
        description: movie.overview,
        imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      }));

      return json(movies);
    }

    return json([], { status: 404 });
  } catch (error) {
    console.error('Error fetching movies:', error);
    return json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
};
