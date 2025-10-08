<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Card, Badge, Input, Select } from 'flowbite-svelte';

	let tasks = [];
	let loading = true;
	let searchQuery = '';
	let statusFilter = '';
	let priorityFilter = '';

	onMount(async () => {
		await loadTasks();
		loading = false;
	});

	async function loadTasks() {
		try {
			const response = await fetch('/api/tasks');
			if (response.ok) {
				tasks = await response.json();
			}
		} catch (error) {
			console.error('Failed to load tasks:', error);
		}
	}

	$: filteredTasks = tasks.filter((task) => {
		const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesStatus = !statusFilter || task.status === statusFilter;
		const matchesPriority = !priorityFilter || task.priority === priorityFilter;
		return matchesSearch && matchesStatus && matchesPriority;
	});
</script>

<div>
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-gray-800 mb-6">My Tasks</h1>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<Input type="text" placeholder="Search tasks..." bind:value={searchQuery} />

			<Select bind:value={statusFilter}>
				<option value="">All Statuses</option>
				<option value="Todo">Todo</option>
				<option value="In Progress">In Progress</option>
				<option value="Done">Done</option>
			</Select>

			<Select bind:value={priorityFilter}>
				<option value="">All Priorities</option>
				<option value="Low">Low</option>
				<option value="Medium">Medium</option>
				<option value="High">High</option>
			</Select>
		</div>
	</div>

	{#if loading}
		<p class="text-gray-600">Loading...</p>
	{:else if filteredTasks.length === 0}
		<Card>
			<p class="text-gray-600">
				{tasks.length === 0 ? 'No tasks assigned to you yet.' : 'No tasks match your filters.'}
			</p>
		</Card>
	{:else}
		<div class="space-y-4">
			{#each filteredTasks as task}
				<Card class="hover:shadow-lg transition-shadow cursor-pointer" on:click={() => goto(`/app/projects/${task.project.id}`)}>
					<div class="flex items-start justify-between">
						<div class="flex-1">
							<div class="flex items-center gap-2 mb-2">
								<h3 class="text-lg font-semibold text-gray-800">{task.title}</h3>
								<Badge
									color={task.status === 'Done' ? 'green' : task.status === 'In Progress' ? 'yellow' : 'gray'}
								>
									{task.status}
								</Badge>
							</div>

							{#if task.description}
								<p class="text-gray-600 mb-3">{task.description}</p>
							{/if}

							<div class="flex items-center gap-4 text-sm text-gray-500">
								<span class="flex items-center gap-1">
									<span class="font-medium">Project:</span>
									{task.project.name}
								</span>

								<Badge
									color={task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'yellow' : 'blue'}
								>
									{task.priority}
								</Badge>

								{#if task.dueDate}
									<span class="flex items-center gap-1">
										<span class="font-medium">Due:</span>
										{new Date(task.dueDate).toLocaleDateString()}
									</span>
								{/if}
							</div>

							{#if task.taskLabels && task.taskLabels.length > 0}
								<div class="flex gap-2 mt-3">
									{#each task.taskLabels as taskLabel}
										<span
											class="px-2 py-1 text-xs rounded"
											style="background-color: {taskLabel.label.color}20; color: {taskLabel.label
												.color}"
										>
											{taskLabel.label.name}
										</span>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				</Card>
			{/each}
		</div>
	{/if}
</div>
