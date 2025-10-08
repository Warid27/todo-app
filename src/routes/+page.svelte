<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		// Redirect to login on home page
		goto('/login');
	});
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
	<div class="text-center">
		<h1 class="text-4xl font-bold text-gray-800 mb-4">Todo List App</h1>
		<p class="text-gray-600">Redirecting to login...</p>
	</div>
</div>
