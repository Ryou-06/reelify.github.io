<script lang="ts">
    let email: string = '';
    let password: string = '';
    let errorMessage: string | null = null;
  
    const handleSubmit = async (event: Event) => {
      event.preventDefault();
      errorMessage = null;
  
      const response = await fetch('/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        // Redirect to home page (Movie List) on successful login
        window.location.href = '/home';
      } else {
        const { message } = await response.json();
        errorMessage = message;
      }
    };
  </script>
  
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6">Log In</h2>
  
      <form on:submit={handleSubmit}>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            bind:value={email}
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
  
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            bind:value={password}
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
  
        {#if errorMessage}
          <div class="text-red-500 text-sm mb-4">{errorMessage}</div>
        {/if}
  
        <button
          type="submit"
          class="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Log In
        </button>
      </form>
  
      <p class="mt-4 text-center text-sm text-gray-600">
        Don't have an account? <a href="/sign-up" class="text-blue-500 hover:text-blue-700">Sign Up</a>
      </p>
    </div>
  </div>
  