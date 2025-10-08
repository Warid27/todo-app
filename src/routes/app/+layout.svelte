<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { currentUser } from '$lib/stores/userStore';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Button } from 'flowbite-svelte';

	let user = null;

	onMount(async () => {
		try {
			const response = await fetch('/api/auth/me');
			if (response.ok) {
				const data = await response.json();
				user = data.user;
				currentUser.set(user);
			} else {
				goto('/login');
			}
		} catch (error) {
			goto('/login');
		}
	});

	async function handleLogout() {
		await fetch('/api/auth/logout', { method: 'POST' });
		goto('/login');
	}
</script>

{#if user}
	<div class="flex min-h-screen bg-gray-50">
		<!-- Sidebar -->
		<Sidebar class="w-64 fixed h-full">
			<SidebarWrapper>
				<div class="p-4 border-b">
					<h1 class="text-xl font-bold text-gray-800">Todo List App</h1>
					<p class="text-sm text-gray-600 mt-1">Welcome, {user.username}</p>
				</div>

				<SidebarGroup>
					<SidebarItem
						label="Dashboard"
						href="/app/dashboard"
						active={$page.url.pathname === '/app/dashboard'}
					/>
					<SidebarItem
						label="Projects"
						href="/app/projects"
						active={$page.url.pathname.startsWith('/app/projects')}
					/>
					<SidebarItem
						label="My Tasks"
						href="/app/tasks"
						active={$page.url.pathname === '/app/tasks'}
					/>
					<SidebarItem
						label="Labels"
						href="/app/labels"
						active={$page.url.pathname === '/app/labels'}
					/>
				</SidebarGroup>

				<div class="absolute bottom-0 w-full p-4 border-t">
					<Button on:click={handleLogout} color="alternative" class="w-full">
						Logout
					</Button>
				</div>
			</SidebarWrapper>
		</Sidebar>

		<!-- Main Content -->
		<div class="ml-64 flex-1 p-8">
			<slot />
		</div>
	</div>
{:else}
	<div class="flex items-center justify-center min-h-screen">
		<p class="text-gray-600">Loading...</p>
	</div>
{/if}
