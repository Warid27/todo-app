<script>
	import { goto } from '$app/navigation';
	import { Button, Card, Input, Label, Alert } from 'flowbite-svelte';

	let username = '';
	let password = '';
	let confirmPassword = '';
	let error = '';
	let loading = false;

	async function handleRegister() {
		error = '';

		// Validation
		if (password !== confirmPassword) {
			error = 'Passwords do not match';
			return;
		}

		if (password.length < 6) {
			error = 'Password must be at least 6 characters long';
			return;
		}

		loading = true;

		try {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Registration failed';
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
		<h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Register</h1>

		{#if error}
			<Alert color="red" class="mb-4">
				{error}
			</Alert>
		{/if}

		<form on:submit|preventDefault={handleRegister} class="space-y-4">
			<div>
				<Label for="username" class="mb-2">Username</Label>
				<Input
					id="username"
					type="text"
					bind:value={username}
					required
					minlength="3"
					placeholder="Choose a username"
				/>
			</div>

			<div>
				<Label for="password" class="mb-2">Password</Label>
				<Input
					id="password"
					type="password"
					bind:value={password}
					required
					minlength="6"
					placeholder="Choose a password"
				/>
			</div>

			<div>
				<Label for="confirmPassword" class="mb-2">Confirm Password</Label>
				<Input
					id="confirmPassword"
					type="password"
					bind:value={confirmPassword}
					required
					placeholder="Confirm your password"
				/>
			</div>

			<Button type="submit" class="w-full" disabled={loading}>
				{loading ? 'Creating account...' : 'Register'}
			</Button>
		</form>

		<div class="text-center mt-4">
			<p class="text-gray-600">
				Already have an account?
				<a href="/login" class="text-blue-600 hover:underline">Login</a>
			</p>
		</div>
	</Card>
</div>
