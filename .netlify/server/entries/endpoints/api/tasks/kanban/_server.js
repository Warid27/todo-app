import { b as getTasksByStatus } from "../../../../../chunks/taskController.js";
async function GET({ url, locals }) {
  try {
    const projectId = url.searchParams.get("projectId");
    if (!projectId) {
      return new Response(JSON.stringify({ error: "Project ID is required" }), {
        status: 400,
        headers: {
          "content-type": "application/json"
        }
      });
    }
    const tasks = await getTasksByStatus(projectId, locals.user.id);
    return new Response(JSON.stringify(tasks), {
      status: 200,
      headers: {
        "content-type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        "content-type": "application/json"
      }
    });
  }
}
export {
  GET
};
