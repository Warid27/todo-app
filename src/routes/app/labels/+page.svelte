<script>
	import { onMount } from 'svelte';
	import { Card, Button, Modal, Input, Label, Alert, Badge } from 'flowbite-svelte';

	let labels = [];
	let loading = true;
	let showCreateModal = false;
	let showEditModal = false;
	let error = '';

	let createForm = {
		name: '',
		color: '#3B82F6'
	};

	let editForm = {
		id: '',
		name: '',
		color: ''
	};

	const predefinedColors = [
		'#3B82F6', // Blue
		'#EF4444', // Red
		'#10B981', // Green
		'#F59E0B', // Yellow
		'#8B5CF6', // Purple
		'#EC4899', // Pink
		'#06B6D4', // Cyan
		'#F97316' // Orange
	];

	onMount(async () => {
		await loadLabels();
		loading = false;
	});

	async function loadLabels() {
		try {
			const response = await fetch('/api/labels');
			if (response.ok) {
				labels = await response.json();
			}
		} catch (error) {
			console.error('Failed to load labels:', error);
		}
	}

	async function handleCreateLabel() {
		error = '';

		try {
			const response = await fetch('/api/labels', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(createForm)
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Failed to create label';
				return;
			}

			showCreateModal = false;
			createForm = { name: '', color: '#3B82F6' };
			await loadLabels();
		} catch (err) {
			error = 'An error occurred. Please try again.';
		}
	}

	function openEditModal(label) {
		editForm = { ...label };
		showEditModal = true;
	}

	async function handleUpdateLabel() {
		error = '';

		try {
			const response = await fetch(`/api/labels/${editForm.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: editForm.name,
					color: editForm.color
				})
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Failed to update label';
				return;
			}

			showEditModal = false;
			await loadLabels();
		} catch (err) {
			error = 'An error occurred. Please try again.';
		}
	}

	async function handleDeleteLabel(labelId) {
		if (!confirm('Are you sure you want to delete this label?')) {
			return;
		}

		try {
			const response = await fetch(`/api/labels/${labelId}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				await loadLabels();
			}
		} catch (err) {
			error = 'Failed to delete label';
		}
	}
</script>

<svelte:head>
	<title>Labels</title>
	<meta name="description" content="View your projects and tasks overview" />
</svelte:head>
<div>
	<div class="flex justify-between items-center mb-8">
		<h1 class="text-3xl font-bold text-gray-800">Labels</h1>
		<Button on:click={() => (showCreateModal = true)}>Create Label</Button>
	</div>

	{#if error}
		<Alert color="red" class="mb-4">
			{error}
		</Alert>
	{/if}

	{#if loading}
		<p class="text-gray-600">Loading...</p>
	{:else if labels.length === 0}
		<Card>
			<p class="text-gray-600">No labels yet. Create your first label to organize tasks!</p>
		</Card>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each labels as label}
				<Card>
					<div class="flex items-center justify-between mb-3">
						<div
							class="px-4 py-2 rounded-lg font-medium"
							style="background-color: {label.color}20; color: {label.color}"
						>
							{label.name}
						</div>
						<div
							class="w-8 h-8 rounded-full"
							style="background-color: {label.color}"
							title={label.color}
						/>
					</div>

					<div class="flex gap-2">
						<Button size="xs" color="alternative" on:click={() => openEditModal(label)} class="flex-1">
							Edit
						</Button>
						<Button size="xs" color="red" on:click={() => handleDeleteLabel(label.id)}>
							Delete
						</Button>
					</div>
				</Card>
			{/each}
		</div>
	{/if}

	<!-- Create Label Modal -->
	<Modal bind:open={showCreateModal} title="Create New Label">
		<form on:submit|preventDefault={handleCreateLabel} class="space-y-4">
			<div>
				<Label for="create-name" class="mb-2">Label Name *</Label>
				<Input
					id="create-name"
					type="text"
					bind:value={createForm.name}
					required
					minlength="2"
					placeholder="Enter label name"
				/>
			</div>

			<div>
				<Label class="mb-2">Color *</Label>
				<div class="grid grid-cols-4 gap-3 mb-3">
					{#each predefinedColors as color}
						<button
							type="button"
							class="w-full h-12 rounded-lg border-2 transition-all {createForm.color === color
								? 'border-gray-800 scale-110'
								: 'border-gray-200 hover:border-gray-400'}"
							style="background-color: {color}"
							on:click={() => (createForm.color = color)}
						/>
					{/each}
				</div>
				<Input type="color" bind:value={createForm.color} />
			</div>

			<div class="p-4 bg-gray-100 rounded-lg">
				<p class="text-sm text-gray-600 mb-2">Preview:</p>
				<div
					class="inline-block px-4 py-2 rounded-lg font-medium"
					style="background-color: {createForm.color}20; color: {createForm.color}"
				>
					{createForm.name || 'Label Name'}
				</div>
			</div>

			<div class="flex gap-4">
				<Button type="submit" class="flex-1">Create Label</Button>
				<Button type="button" color="alternative" on:click={() => (showCreateModal = false)}>
					Cancel
				</Button>
			</div>
		</form>
	</Modal>

	<!-- Edit Label Modal -->
	<Modal bind:open={showEditModal} title="Edit Label">
		<form on:submit|preventDefault={handleUpdateLabel} class="space-y-4">
			<div>
				<Label for="edit-name" class="mb-2">Label Name *</Label>
				<Input
					id="edit-name"
					type="text"
					bind:value={editForm.name}
					required
					minlength="2"
					placeholder="Enter label name"
				/>
			</div>

			<div>
				<Label class="mb-2">Color *</Label>
				<div class="grid grid-cols-4 gap-3 mb-3">
					{#each predefinedColors as color}
						<button
							type="button"
							class="w-full h-12 rounded-lg border-2 transition-all {editForm.color === color
								? 'border-gray-800 scale-110'
								: 'border-gray-200 hover:border-gray-400'}"
							style="background-color: {color}"
							on:click={() => (editForm.color = color)}
						/>
					{/each}
				</div>
				<Input type="color" bind:value={editForm.color} />
			</div>

			<div class="p-4 bg-gray-100 rounded-lg">
				<p class="text-sm text-gray-600 mb-2">Preview:</p>
				<div
					class="inline-block px-4 py-2 rounded-lg font-medium"
					style="background-color: {editForm.color}20; color: {editForm.color}"
				>
					{editForm.name || 'Label Name'}
				</div>
			</div>

			<div class="flex gap-4">
				<Button type="submit" class="flex-1">Update Label</Button>
				<Button type="button" color="alternative" on:click={() => (showEditModal = false)}>
					Cancel
				</Button>
			</div>
		</form>
	</Modal>
</div>
