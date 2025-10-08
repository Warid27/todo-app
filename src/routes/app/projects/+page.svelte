<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Card, Button, Input, Badge } from 'flowbite-svelte';

	let projects = [];
	let loading = true;
	let searchQuery = '';

	onMount(async () => {
		await loadProjects();
		loading = false;
	});

	async function loadProjects() {
		try {
			const response = await fetch('/api/projects');
			if (response.ok) {
				projects = await response.json();
			}
		} catch (error) {
			console.error('Failed to load projects:', error);
		}
	}

	$: filteredProjects = projects.filter((p) =>
		p.name.toLowerCase().includes(searchQuery.toLowerCase())
	);
</script>

<div>
	<div class="flex justify-between items-center mb-8">
		<h1 class="text-3xl font-bold text-gray-800">Projects</h1>
		<Button on:click={() => goto('/app/projects/new')}>Create Project</Button>
	</div>

	<div class="mb-6">
		<Input type="text" placeholder="Search projects..." bind:value={searchQuery} />
	</div>

	{#if loading}
		<p class="text-gray-600">Loading...</p>
	{:else if filteredProjects.length === 0}
		<Card>
			<p class="text-gray-600">
				{searchQuery ? 'No projects found matching your search.' : 'No projects yet. Create your first project!'}
			</p>
		</Card>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filteredProjects as project}
				<Card class="hover:shadow-lg transition-shadow">
					<div class="mb-4">
						<div class="flex items-start justify-between">
							<h3 class="text-xl font-semibold text-gray-800 mb-2">{project.name}</h3>
							<Badge color={project.ownerId ? 'blue' : 'gray'}>
								{project.owner?.username === project.owner?.username ? 'Owner' : 'Member'}
							</Badge>
						</div>
						{#if project.description}
							<p class="text-gray-600 text-sm line-clamp-2">{project.description}</p>
						{/if}
					</div>

					<div class="space-y-2 mb-4">
						<div class="flex items-center justify-between text-sm">
							<span class="text-gray-500">Tasks:</span>
							<span class="font-medium">{project.tasks?.length || 0}</span>
						</div>
						<div class="flex items-center justify-between text-sm">
							<span class="text-gray-500">Members:</span>
							<span class="font-medium">{(project.members?.length || 0) + 1}</span>
						</div>
						{#if project.startDate}
							<div class="flex items-center justify-between text-sm">
								<span class="text-gray-500">Start:</span>
								<span class="font-medium">{new Date(project.startDate).toLocaleDateString()}</span>
							</div>
						{/if}
					</div>

					<Button on:click={() => goto(`/app/projects/${project.id}`)} class="w-full">
						View Project
					</Button>
				</Card>
			{/each}
		</div>
	{/if}
</div>
