import { g as getUserById } from "./authController.js";
async function handle({ event, resolve }) {
  const sessionId = event.cookies.get("session");
  if (sessionId) {
    try {
      const user = await getUserById(sessionId);
      if (user) {
        event.locals.user = user;
      }
    } catch (error) {
      event.cookies.delete("session", { path: "/" });
    }
  }
  const isProtectedRoute = event.url.pathname.startsWith("/app") || event.url.pathname.startsWith("/api") && !event.url.pathname.startsWith("/api/auth");
  if (isProtectedRoute && !event.locals.user) {
    if (event.url.pathname.startsWith("/app")) {
      return new Response(null, {
        status: 302,
        headers: {
          location: "/login"
        }
      });
    }
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "content-type": "application/json"
      }
    });
  }
  if (event.locals.user && (event.url.pathname === "/login" || event.url.pathname === "/register")) {
    return new Response(null, {
      status: 302,
      headers: {
        location: "/app/dashboard"
      }
    });
  }
  return await resolve(event);
}
export {
  handle
};
