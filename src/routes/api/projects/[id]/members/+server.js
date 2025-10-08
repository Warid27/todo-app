import * as ProjectController from '$lib/server/controllers/projectController.js';

/**
 * Add a member to a project
 */
export async function POST({ params, request, locals }) {
	try {
		const data = await request.json();

		const member = await ProjectController.addMember(params.id, locals.user.id, data);

		return new Response(JSON.stringify(member), {
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
