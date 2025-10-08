import * as TaskController from '$lib/server/controllers/taskController.js';

/**
 * Get a task by ID
 */
export async function GET({ params, locals }) {
	try {
		const task = await TaskController.getTask(params.id, locals.user.id);

		return new Response(JSON.stringify(task), {
			status: 200,
			headers: {
				'content-type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: error.message.includes('not found') ? 404 : 403,
			headers: {
				'content-type': 'application/json'
			}
		});
	}
}

/**
 * Update a task
 */
export async function PUT({ params, request, locals }) {
	try {
		const data = await request.json();

		const task = await TaskController.updateTask(params.id, locals.user.id, data);

		return new Response(JSON.stringify(task), {
			status: 200,
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

/**
 * Delete a task
 */
export async function DELETE({ params, locals }) {
	try {
		const task = await TaskController.deleteTask(params.id, locals.user.id);

		return new Response(JSON.stringify(task), {
			status: 200,
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
