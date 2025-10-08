<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import {
		Card,
		Button,
		Badge,
		Tabs,
		TabItem,
		Modal,
		Input,
		Label,
		Select,
		Textarea,
		Alert
	} from 'flowbite-svelte';

	let project = null;
	let kanbanTasks = { todo: [], inProgress: [], done: [] };
	let users = [];
	let labels = [];
	let loading = true;

	// Modals
	let showTaskModal = false;
	let showMemberModal = false;
	let showEditModal = false;

	// Task form
	let taskForm = {
		title: '',
		description: '',
		status: 'Todo',
		priority: 'Medium',
		assigneeId: '',
		dueDate: '',
		labelIds: []
	};

	// Member form
	let memberForm = {
		userId: '',
		role: 'developer'
	};

	// Edit form
	let editForm = {
		name: '',
		description: '',
		startDate: '',
		endDate: ''
	};

	let error = '';
	let activeTab = 'kanban';

	$: projectId = $page.params.id;

	onMount(async () => {
		await Promise.all([loadProject(), loadKanbanTasks(), loadUsers(), loadLabels()]);
		loading = false;
	});

	async function loadProject() {
		try {
			const response = await fetch(`/api/projects/${projectId}`);
			if (response.ok) {
				project = await response.json();
				// Initialize edit form
				editForm.name = project.name;
				editForm.description = project.description || '';
				editForm.startDate = project.startDate
					? new Date(project.startDate).toISOString().split('T')[0]
					: '';
				editForm.endDate = project.endDate
					? new Date(project.endDate).toISOString().split('T')[0]
					: '';
			}
		} catch (error) {
			console.error('Failed to load project:', error);
		}
	}

	async function loadKanbanTasks() {
		try {
			const response = await fetch(`/api/tasks/kanban?projectId=${projectId}`);
			if (response.ok) {
				kanbanTasks = await response.json();
			}
		} catch (error) {
			console.error('Failed to load tasks:', error);
		}
	}

	async function loadUsers() {
		try {
			const response = await fetch('/api/users');
			if (response.ok) {
				users = await response.json();
			}
		} catch (error) {
			console.error('Failed to load users:', error);
		}
	}

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

	async function handleCreateTask() {
		error = '';

		try {
			const response = await fetch('/api/tasks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...taskForm,
					projectId,
					assigneeId: taskForm.assigneeId || null,
					dueDate: taskForm.dueDate || null
				})
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Failed to create task';
				return;
			}

			showTaskModal = false;
			taskForm = {
				title: '',
				description: '',
				status: 'Todo',
				priority: 'Medium',
				assigneeId: '',
				dueDate: '',
				labelIds: []
			};

			await loadKanbanTasks();
		} catch (err) {
			error = 'An error occurred. Please try again.';
		}
	}

	async function handleAddMember() {
		error = '';

		try {
			const response = await fetch(`/api/projects/${projectId}/members`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(memberForm)
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Failed to add member';
				return;
			}

			showMemberModal = false;
			memberForm = { userId: '', role: 'developer' };

			await loadProject();
		} catch (err) {
			error = 'An error occurred. Please try again.';
		}
	}

	async function handleUpdateProject() {
		error = '';

		try {
			const response = await fetch(`/api/projects/${projectId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(editForm)
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || 'Failed to update project';
				return;
			}

			showEditModal = false;
			await loadProject();
		} catch (err) {
			error = 'An error occurred. Please try again.';
		}
	}

	async function handleDeleteProject() {
		if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
			return;
		}

		try {
			const response = await fetch(`/api/projects/${projectId}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				goto('/app/projects');
			}
		} catch (err) {
			error = 'Failed to delete project';
		}
	}

	async function handleUpdateTaskStatus(taskId, newStatus) {
		try {
			const response = await fetch(`/api/tasks/${taskId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ status: newStatus })
			});

			if (response.ok) {
				await loadKanbanTasks();
			}
		} catch (err) {
			console.error('Failed to update task:', err);
		}
	}

	async function handleRemoveMember(memberId) {
		if (!confirm('Are you sure you want to remove this member?')) {
			return;
		}

		try {
			const response = await fetch(`/api/members/${memberId}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				await loadProject();
			}
		} catch (err) {
			error = 'Failed to remove member';
		}
	}
</script>

<div>
	{#if loading}
		<p class="text-gray-600">Loading...</p>
	{:else if project}
		<!-- Header -->
		<div class="mb-8">
			<div class="flex justify-between items-start mb-4">
				<div>
					<h1 class="text-3xl font-bold text-gray-800 mb-2">{project.name}</h1>
					{#if project.description}
						<p class="text-gray-600">{project.description}</p>
					{/if}
				</div>
				<div class="flex gap-2">
					<Button on:click={() => (showEditModal = true)} color="alternative">Edit</Button>
					<Button on:click={handleDeleteProject} color="red">Delete</Button>
				</div>
			</div>

			{#if error}
				<Alert color="red" class="mb-4">
					{error}
				</Alert>
			{/if}
		</div>

		<!-- Tabs -->
		<Tabs bind:activeTabValue={activeTab}>
			<!-- Kanban Board -->
			<TabItem value="kanban" title="Kanban Board">
				<div class="mb-4">
					<Button on:click={() => (showTaskModal = true)}>Add Task</Button>
				</div>

				<div class="grid grid-cols-3 gap-6">
					<!-- Todo Column -->
					<div class="bg-gray-100 p-4 rounded-lg">
						<h3 class="font-semibold text-gray-700 mb-4 flex items-center justify-between">
							<span>Todo</span>
							<Badge>{kanbanTasks.todo?.length || 0}</Badge>
						</h3>
						<div class="space-y-3">
							{#each kanbanTasks.todo || [] as task}
								<Card class="hover:shadow-md transition-shadow">
									<h4 class="font-medium text-gray-800 mb-2">{task.title}</h4>
									{#if task.description}
										<p class="text-sm text-gray-600 mb-3">{task.description}</p>
									{/if}
									<div class="flex items-center justify-between text-xs">
										<Badge color={task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'yellow' : 'blue'}>
											{task.priority}
										</Badge>
										{#if task.assignee}
											<span class="text-gray-500">{task.assignee.username}</span>
										{/if}
									</div>
									<div class="mt-3 flex gap-2">
										<Button
											size="xs"
											color="alternative"
											on:click={() => handleUpdateTaskStatus(task.id, 'In Progress')}
										>
											Start
										</Button>
									</div>
								</Card>
							{/each}
						</div>
					</div>

					<!-- In Progress Column -->
					<div class="bg-yellow-50 p-4 rounded-lg">
						<h3 class="font-semibold text-gray-700 mb-4 flex items-center justify-between">
							<span>In Progress</span>
							<Badge color="yellow">{kanbanTasks.inProgress?.length || 0}</Badge>
						</h3>
						<div class="space-y-3">
							{#each kanbanTasks.inProgress || [] as task}
								<Card class="hover:shadow-md transition-shadow">
									<h4 class="font-medium text-gray-800 mb-2">{task.title}</h4>
									{#if task.description}
										<p class="text-sm text-gray-600 mb-3">{task.description}</p>
									{/if}
									<div class="flex items-center justify-between text-xs">
										<Badge color={task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'yellow' : 'blue'}>
											{task.priority}
										</Badge>
										{#if task.assignee}
											<span class="text-gray-500">{task.assignee.username}</span>
										{/if}
									</div>
									<div class="mt-3 flex gap-2">
										<Button
											size="xs"
											color="alternative"
											on:click={() => handleUpdateTaskStatus(task.id, 'Todo')}
										>
											Back
										</Button>
										<Button
											size="xs"
											color="green"
											on:click={() => handleUpdateTaskStatus(task.id, 'Done')}
										>
											Done
										</Button>
									</div>
								</Card>
							{/each}
						</div>
					</div>

					<!-- Done Column -->
					<div class="bg-green-50 p-4 rounded-lg">
						<h3 class="font-semibold text-gray-700 mb-4 flex items-center justify-between">
							<span>Done</span>
							<Badge color="green">{kanbanTasks.done?.length || 0}</Badge>
						</h3>
						<div class="space-y-3">
							{#each kanbanTasks.done || [] as task}
								<Card class="hover:shadow-md transition-shadow opacity-75">
									<h4 class="font-medium text-gray-800 mb-2 line-through">{task.title}</h4>
									{#if task.description}
										<p class="text-sm text-gray-600 mb-3">{task.description}</p>
									{/if}
									<div class="flex items-center justify-between text-xs">
										<Badge color={task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'yellow' : 'blue'}>
											{task.priority}
										</Badge>
										{#if task.assignee}
											<span class="text-gray-500">{task.assignee.username}</span>
										{/if}
									</div>
								</Card>
							{/each}
						</div>
					</div>
				</div>
			</TabItem>

			<!-- Members Tab -->
			<TabItem value="members" title="Members">
				<div class="mb-4">
					<Button on:click={() => (showMemberModal = true)}>Add Member</Button>
				</div>

				<div class="space-y-3">
					<!-- Owner -->
					<Card>
						<div class="flex items-center justify-between">
							<div>
								<p class="font-medium text-gray-800">{project.owner.username}</p>
								<p class="text-sm text-gray-500">Owner</p>
							</div>
							<Badge color="blue">Owner</Badge>
						</div>
					</Card>

					<!-- Members -->
					{#each project.members || [] as member}
						<Card>
							<div class="flex items-center justify-between">
								<div>
									<p class="font-medium text-gray-800">{member.user.username}</p>
									<p class="text-sm text-gray-500 capitalize">{member.role}</p>
								</div>
								<div class="flex items-center gap-2">
									<Badge color="green" class="capitalize">{member.role}</Badge>
									<Button size="xs" color="red" on:click={() => handleRemoveMember(member.id)}>
										Remove
									</Button>
								</div>
							</div>
						</Card>
					{/each}
				</div>
			</TabItem>
		</Tabs>

		<!-- Create Task Modal -->
		<Modal bind:open={showTaskModal} title="Create New Task">
			<form on:submit|preventDefault={handleCreateTask} class="space-y-4">
				<div>
					<Label for="title" class="mb-2">Title *</Label>
					<Input id="title" type="text" bind:value={taskForm.title} required minlength="3" />
				</div>

				<div>
					<Label for="description" class="mb-2">Description</Label>
					<Textarea id="description" bind:value={taskForm.description} rows="3" />
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<Label for="status" class="mb-2">Status</Label>
						<Select id="status" bind:value={taskForm.status}>
							<option value="Todo">Todo</option>
							<option value="In Progress">In Progress</option>
							<option value="Done">Done</option>
						</Select>
					</div>

					<div>
						<Label for="priority" class="mb-2">Priority</Label>
						<Select id="priority" bind:value={taskForm.priority}>
							<option value="Low">Low</option>
							<option value="Medium">Medium</option>
							<option value="High">High</option>
						</Select>
					</div>
				</div>

				<div>
					<Label for="assignee" class="mb-2">Assignee</Label>
					<Select id="assignee" bind:value={taskForm.assigneeId}>
						<option value="">Unassigned</option>
						{#each users as user}
							<option value={user.id}>{user.username}</option>
						{/each}
					</Select>
				</div>

				<div>
					<Label for="dueDate" class="mb-2">Due Date</Label>
					<Input id="dueDate" type="date" bind:value={taskForm.dueDate} />
				</div>

				<div class="flex gap-4">
					<Button type="submit" class="flex-1">Create Task</Button>
					<Button type="button" color="alternative" on:click={() => (showTaskModal = false)}>
						Cancel
					</Button>
				</div>
			</form>
		</Modal>

		<!-- Add Member Modal -->
		<Modal bind:open={showMemberModal} title="Add Team Member">
			<form on:submit|preventDefault={handleAddMember} class="space-y-4">
				<div>
					<Label for="user" class="mb-2">User *</Label>
					<Select id="user" bind:value={memberForm.userId} required>
						<option value="">Select a user</option>
						{#each users as user}
							<option value={user.id}>{user.username}</option>
						{/each}
					</Select>
				</div>

				<div>
					<Label for="role" class="mb-2">Role *</Label>
					<Select id="role" bind:value={memberForm.role} required>
						<option value="developer">Developer</option>
						<option value="manager">Manager</option>
						<option value="qa">QA</option>
					</Select>
				</div>

				<div class="flex gap-4">
					<Button type="submit" class="flex-1">Add Member</Button>
					<Button type="button" color="alternative" on:click={() => (showMemberModal = false)}>
						Cancel
					</Button>
				</div>
			</form>
		</Modal>

		<!-- Edit Project Modal -->
		<Modal bind:open={showEditModal} title="Edit Project">
			<form on:submit|preventDefault={handleUpdateProject} class="space-y-4">
				<div>
					<Label for="edit-name" class="mb-2">Project Name *</Label>
					<Input id="edit-name" type="text" bind:value={editForm.name} required minlength="3" />
				</div>

				<div>
					<Label for="edit-description" class="mb-2">Description</Label>
					<Textarea id="edit-description" bind:value={editForm.description} rows="4" />
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<Label for="edit-startDate" class="mb-2">Start Date</Label>
						<Input id="edit-startDate" type="date" bind:value={editForm.startDate} />
					</div>

					<div>
						<Label for="edit-endDate" class="mb-2">End Date</Label>
						<Input id="edit-endDate" type="date" bind:value={editForm.endDate} />
					</div>
				</div>

				<div class="flex gap-4">
					<Button type="submit" class="flex-1">Update Project</Button>
					<Button type="button" color="alternative" on:click={() => (showEditModal = false)}>
						Cancel
					</Button>
				</div>
			</form>
		</Modal>
	{/if}
</div>
