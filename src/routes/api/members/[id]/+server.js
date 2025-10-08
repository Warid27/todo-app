import * as ProjectController from '$lib/server/controllers/projectController.js';

/**
 * Update a member's role
 */
export async function PUT({ params, request, locals }) {
	try {
		const data = await request.json();

		const member = await ProjectController.updateMemberRole(params.id, locals.user.id, data.role);

		return new Response(JSON.stringify(member), {
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
 * Remove a member from a project
 */
export async function DELETE({ params, locals }) {
	try {
		const member = await ProjectController.removeMember(params.id, locals.user.id);

		return new Response(JSON.stringify(member), {
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
