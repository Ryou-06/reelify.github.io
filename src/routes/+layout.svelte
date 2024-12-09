<script lang="ts">
	import { goto } from '$app/navigation';  // SvelteKit's navigation API
	import '../app.css';
  </script>
  
  <!-- Top Navbar -->
  <div class="fixed top-0 left-0 w-full bg-gray-800 text-white flex justify-between items-center p-4 z-50">
	<!-- Reelify Logo or Home Link -->
	<button 
	  on:click={() => goto('/home')}
	  class="text-2xl font-bold hover:text-blue-400 transition"
	>
	  Reelify
	</button>
	
	<!-- Navigation Buttons -->
	<div class="space-x-4">
	  <button 
		on:click={() => goto('/watchlist')}
		class="text-lg hover:text-blue-400 transition"
	  >
		Watchlist
	  </button>
	</div>
  </div>
  
  <!-- Render the slot content here -->
  <slot></slot>
  