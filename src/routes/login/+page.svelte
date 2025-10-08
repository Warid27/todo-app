<script>
	import { goto } from '$app/navigation';
	import { Button, Card, Input, Label, Alert } from 'flowbite-svelte';

	let username = '';
	let password = '';
	let error = '';
	let loading = false;

	async function handleLogin() {
		error = '';
		loading = true;

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Login failed';
				loading = false;
				return;
			}

			goto('/app/dashboard');
		} catch (err) {
			error = 'An error occurred. Please try again.';
			loading = false;
		}
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
	<Card class="w-full max-w-md">
		<h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>

		{#if error}
			<Alert color="red" class="mb-4">
				{error}
			</Alert>
		{/if}

		<form on:submit|preventDefault={handleLogin} class="space-y-4">
			<div>
				<Label for="username" class="mb-2">Username</Label>
				<Input
					id="username"
					type="text"
					bind:value={username}
					required
					placeholder="Enter your username"
				/>
			</div>

			<div>
				<Label for="password" class="mb-2">Password</Label>
				<Input
					id="password"
					type="password"
					bind:value={password}
					required
					placeholder="Enter your password"
				/>
			</div>

			<Button type="submit" class="w-full" disabled={loading}>
				{loading ? 'Logging in...' : 'Login'}
			</Button>
		</form>

		<div class="text-center mt-4">
			<p class="text-gray-600">
				Don't have an account?
				<a href="/register" class="text-blue-600 hover:underline">Register</a>
			</p>
		</div>
	</Card>
</div>
