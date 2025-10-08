import * as ProjectController from '$lib/server/controllers/projectController.js';

/**
 * Get a project by ID
 */
export async function GET({ params, locals }) {
	try {
		const project = await ProjectController.getProject(params.id, locals.user.id);

		return new Response(JSON.stringify(project), {
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
 * Update a project
 */
export async function PUT({ params, request, locals }) {
	try {
		const data = await request.json();

		const project = await ProjectController.updateProject(params.id, locals.user.id, data);

		return new Response(JSON.stringify(project), {
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
 * Delete a project
 */
export async function DELETE({ params, locals }) {
	try {
		const project = await ProjectController.deleteProject(params.id, locals.user.id);

		return new Response(JSON.stringify(project), {
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
