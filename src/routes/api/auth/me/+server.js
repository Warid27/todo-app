/**
 * Get current user info
 */
export async function GET({ locals }) {
	if (!locals.user) {
		return new Response(JSON.stringify({ error: 'Not authenticated' }), {
			status: 401,
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	return new Response(JSON.stringify({ user: locals.user }), {
		status: 200,
		headers: {
			'content-type': 'application/json'
		}
	});
}
