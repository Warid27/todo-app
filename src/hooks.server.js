import * as AuthController from '$lib/server/controllers/authController.js';

/**
 * Handle authentication for all requests
 */
export async function handle({ event, resolve }) {
	// Get session from cookies
	const sessionId = event.cookies.get('session');

	if (sessionId) {
		try {
			// Verify session and get user
			const user = await AuthController.getUserById(sessionId);
			if (user) {
				event.locals.user = user;
			}
		} catch (error) {
			// Invalid session, clear cookie
			event.cookies.delete('session', { path: '/' });
		}
	}

	// Check if route requires authentication
	const isProtectedRoute = event.url.pathname.startsWith('/app') || 
	                        event.url.pathname.startsWith('/api') && 
	                        !event.url.pathname.startsWith('/api/auth');

	if (isProtectedRoute && !event.locals.user) {
		// Redirect to login for protected routes
		if (event.url.pathname.startsWith('/app')) {
			return new Response(null, {
				status: 302,
				headers: {
					location: '/login'
				}
			});
		}

		// Return 401 for API routes
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	// Redirect to dashboard if already logged in and trying to access auth pages
	if (event.locals.user && 
	    (event.url.pathname === '/login' || event.url.pathname === '/register')) {
		return new Response(null, {
			status: 302,
			headers: {
				location: '/app/dashboard'
			}
		});
	}

	return await resolve(event);
}
