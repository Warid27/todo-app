<script>
	import { goto } from '$app/navigation';
	import { Card, Button, Input, Label, Textarea, Alert } from 'flowbite-svelte';

	let name = '';
	let description = '';
	let startDate = '';
	let endDate = '';
	let error = '';
	let loading = false;

	async function handleSubmit() {
		error = '';
		loading = true;

		try {
			const response = await fetch('/api/projects', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name,
					description: description || null,
					startDate: startDate || null,
					endDate: endDate || null
				})
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Failed to create project';
				loading = false;
				return;
			}

			goto(`/app/projects/${data.id}`);
		} catch (err) {
			error = 'An error occurred. Please try again.';
			loading = false;
		}
	}
</script>

<div class="max-w-2xl mx-auto">
	<div class="mb-6">
		<h1 class="text-3xl font-bold text-gray-800">Create New Project</h1>
	</div>

	<Card>
		{#if error}
			<Alert color="red" class="mb-4">
				{error}
			</Alert>
		{/if}

		<form on:submit|preventDefault={handleSubmit} class="space-y-6">
			<div>
				<Label for="name" class="mb-2">Project Name *</Label>
				<Input
					id="name"
					type="text"
					bind:value={name}
					required
					minlength="3"
					placeholder="Enter project name"
				/>
			</div>

			<div>
				<Label for="description" class="mb-2">Description</Label>
				<Textarea
					id="description"
					bind:value={description}
					rows="4"
					placeholder="Enter project description (optional)"
				/>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div>
					<Label for="startDate" class="mb-2">Start Date</Label>
					<Input id="startDate" type="date" bind:value={startDate} />
				</div>

				<div>
					<Label for="endDate" class="mb-2">End Date</Label>
					<Input id="endDate" type="date" bind:value={endDate} />
				</div>
			</div>

			<div class="flex gap-4">
				<Button type="submit" disabled={loading} class="flex-1">
					{loading ? 'Creating...' : 'Create Project'}
				</Button>
				<Button type="button" color="alternative" on:click={() => goto('/app/projects')}>
					Cancel
				</Button>
			</div>
		</form>
	</Card>
</div>
