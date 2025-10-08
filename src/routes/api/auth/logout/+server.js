/**
 * Logout a user
 */
export async function POST({ cookies }) {
	cookies.delete('session', { path: '/' });

	return new Response(JSON.stringify({ success: true }), {
		status: 200,
		headers: {
			'content-type': 'application/json'
		}
	});
}
