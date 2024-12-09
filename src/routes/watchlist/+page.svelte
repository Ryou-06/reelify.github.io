<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation'; // For redirecting to login page if needed
  
  let watchlist: { id: number, title: string, description: string, imageUrl: string }[] = [];
  let userId: number | null = null;

  onMount(async () => {
    try {
      const session = await fetch('/api/auth/session').then(res => res.json());
      
      if (session && session.user) {
        userId = Number(session.user.id); // Assuming session contains a user with an ID
      } else {
        console.error('User not logged in');
        goto('/auth'); // Redirect to the login page if no user is logged in
        return;
      }

      // Fetch the watchlist based on the logged-in user ID
      const response = await fetch(`/api/watchlist?userId=${userId}`);
      if (response.ok) {
        watchlist = await response.json();
      } else {
        console.error('Failed to fetch watchlist');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
</script>

<!-- Layout Container -->
<div class="container mx-auto px-4 py-8">
  <!-- Page Heading -->
  <h1 class="text-4xl font-bold text-center my-8 text-gray-800">
    Your Watchlist
  </h1>

  <!-- Watchlist Grid -->
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {#each watchlist as item, index}
        <div class="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
          <img src={item.imageUrl} alt={item.title} class="w-full h-48 object-cover" />
          <div class="p-4">
            <h2 class="text-xl font-semibold text-gray-800">{index + 1}. {item.title}</h2>
            <p class="text-gray-600 text-sm mt-2">{item.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
