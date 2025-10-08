import * as UserModel from '$lib/server/models/userModel.js';

/**
 * Get all users (for task assignment dropdown)
 */
export async function GET() {
	try {
		const users = await UserModel.findAll();

		return new Response(JSON.stringify(users), {
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
