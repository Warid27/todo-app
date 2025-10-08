import * as ProjectController from '$lib/server/controllers/projectController.js';

/**
 * Get all projects for current user
 */
export async function GET({ locals }) {
	try {
		const projects = await ProjectController.getUserProjects(locals.user.id);

		return new Response(JSON.stringify(projects), {
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
 * Create a new project
 */
export async function POST({ request, locals }) {
	try {
		const data = await request.json();

		const project = await ProjectController.createProject(locals.user.id, data);

		return new Response(JSON.stringify(project), {
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
