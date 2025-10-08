import * as TaskController from '$lib/server/controllers/taskController.js';

/**
 * Get tasks for current user
 */
export async function GET({ url, locals }) {
	try {
		const projectId = url.searchParams.get('projectId');

		if (projectId) {
			// Get tasks for a specific project with optional filters
			const filters = {};
			const status = url.searchParams.get('status');
			const priority = url.searchParams.get('priority');
			const assigneeId = url.searchParams.get('assigneeId');
			const labelId = url.searchParams.get('labelId');

			if (status) filters.status = status;
			if (priority) filters.priority = priority;
			if (assigneeId) filters.assigneeId = assigneeId;
			if (labelId) filters.labelId = labelId;

			const tasks = await TaskController.getProjectTasks(projectId, locals.user.id, filters);

			return new Response(JSON.stringify(tasks), {
				status: 200,
				headers: {
					'content-type': 'application/json'
				}
			});
		} else {
			// Get tasks assigned to current user
			const tasks = await TaskController.getUserTasks(locals.user.id);

			return new Response(JSON.stringify(tasks), {
				status: 200,
				headers: {
					'content-type': 'application/json'
				}
			});
		}
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
			headers: {
				'content-type': 'application/json'
			}
		});
	}
}

/**
 * Create a new task
 */
export async function POST({ request, locals }) {
	try {
		const data = await request.json();

		const task = await TaskController.createTask(locals.user.id, data);

		return new Response(JSON.stringify(task), {
			status: 201,
			headers: {
				'content-type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
			headers: {
				'content-type': 'application/json'
			}
		});
	}
}
