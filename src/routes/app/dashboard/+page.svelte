<script>
	import { onMount } from 'svelte';
	import { Card, Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	let projects = [];
	let myTasks = [];
	let loading = true;

	onMount(async () => {
		await Promise.all([loadProjects(), loadMyTasks()]);
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

	async function loadMyTasks() {
		try {
			const response = await fetch('/api/tasks');
			if (response.ok) {
				myTasks = await response.json();
			}
		} catch (error) {
			console.error('Failed to load tasks:', error);
		}
	}

	function getTaskStats(project) {
		const total = project.tasks?.length || 0;
		const done = project.tasks?.filter((t) => t.status === 'Done').length || 0;
		return { total, done };
	}
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="View your projects and tasks overview" />
</svelte:head>

<div>
	<div class="flex justify-between items-center mb-8">
		<h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
		<Button on:click={() => goto('/app/projects/new')}>Create Project</Button>
	</div>

	{#if loading}
		<p class="text-gray-600">Loading...</p>
	{:else}
		<!-- Projects Overview -->
		<div class="mb-8">
			<h2 class="text-2xl font-semibold text-gray-700 mb-4">My Projects</h2>
			{#if projects.length === 0}
				<Card>
					<p class="text-gray-600">No projects yet. Create your first project to get started!</p>
				</Card>
			{:else}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{#each projects as project}
						<Card class="hover:shadow-lg transition-shadow cursor-pointer" on:click={() => goto(`/app/projects/${project.id}`)}>
							<h3 class="text-xl font-semibold text-gray-800 mb-2">{project.name}</h3>
							{#if project.description}
								<p class="text-gray-600 text-sm mb-4">{project.description}</p>
							{/if}
							<div class="flex items-center justify-between text-sm">
								<span class="text-gray-500">
									{getTaskStats(project).done} / {getTaskStats(project).total} tasks completed
								</span>
								<span class="px-2 py-1 bg-blue-100 text-blue-800 rounded">
									{project.members?.length || 0} members
								</span>
							</div>
						</Card>
					{/each}
				</div>
			{/if}
		</div>

		<!-- My Tasks -->
		<div>
			<h2 class="text-2xl font-semibold text-gray-700 mb-4">My Assigned Tasks</h2>
			{#if myTasks.length === 0}
				<Card>
					<p class="text-gray-600">No tasks assigned to you yet.</p>
				</Card>
			{:else}
				<div class="space-y-3">
					{#each myTasks.slice(0, 5) as task}
						<Card class="hover:shadow-md transition-shadow cursor-pointer" on:click={() => goto(`/app/projects/${task.project.id}`)}>
							<div class="flex items-center justify-between">
								<div class="flex-1">
									<h4 class="font-semibold text-gray-800">{task.title}</h4>
									<p class="text-sm text-gray-500 mt-1">{task.project.name}</p>
								</div>
								<div class="flex items-center gap-2">
									<span class="px-3 py-1 text-xs rounded-full {
										task.status === 'Done' ? 'bg-green-100 text-green-800' :
										task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
										'bg-gray-100 text-gray-800'
									}">
										{task.status}
									</span>
									<span class="px-3 py-1 text-xs rounded-full {
										task.priority === 'High' ? 'bg-red-100 text-red-800' :
										task.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
										'bg-blue-100 text-blue-800'
									}">
										{task.priority}
									</span>
								</div>
							</div>
						</Card>
					{/each}
				</div>
				{#if myTasks.length > 5}
					<div class="mt-4 text-center">
						<Button color="alternative" on:click={() => goto('/app/tasks')}>
							View All Tasks
						</Button>
					</div>
				{/if}
			{/if}
		</div>
	{/if}
</div>
