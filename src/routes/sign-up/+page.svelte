<script lang="ts">
    let fullname: string = '';
    let email: string = '';
    let password: string = '';
    let confirmPassword: string = '';
    let errorMessage: string | null = null;
  
    const handleSubmit = async (event: Event) => {
      event.preventDefault();
      errorMessage = null;
  
      if (password !== confirmPassword) {
        errorMessage = 'Passwords do not match';
        return;
      }
  
      const response = await fetch('/api/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, email, password }),
      });
  
      if (response.ok) {
        const { redirectTo } = await response.json();
        // Redirect to the page specified in the response
        window.location.href = redirectTo;
      } else {
        const { message } = await response.json();
        errorMessage = message;
      }
    };
  </script>
  
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6">Sign Up</h2>
  
      <form on:submit={handleSubmit}>
        <!-- Full Name Input -->
        <div class="mb-4">
          <label for="fullname" class="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="fullname"
            bind:value={fullname}
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
  
        <!-- Email Input -->
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
  
        <!-- Password Input -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            bind:value={password}
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
  
        <!-- Confirm Password Input -->
        <div class="mb-6">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            bind:value={confirmPassword}
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
          Sign Up
        </button>
      </form>
  
      <p class="mt-4 text-center text-sm text-gray-600">
        Already have an account? <a href="/" class="text-blue-500 hover:text-blue-700">Login</a>
      </p>
    </div>
  </div>
  