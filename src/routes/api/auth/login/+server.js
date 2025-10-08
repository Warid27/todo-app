import * as AuthController from '$lib/server/controllers/authController.js';

/**
 * Login a user
 */
export async function POST({ request, cookies }) {
	try {
		const data = await request.json();

		const user = await AuthController.login(data.username, data.password);

		// Set session cookie
		cookies.set('session', user.id, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: false, // Set to true in production with HTTPS
			maxAge: 60 * 60 * 24 * 30 // 30 days
		});

		return new Response(JSON.stringify({ user }), {
			status: 200,
			headers: {
				'content-type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ error: error.message }),
			{
				status: 400,
				headers: {
					'content-type': 'application/json'
				}
			}
		);
	}
}
