import { g as getUserProjects, c as createProject } from "../../../../chunks/projectController.js";
async function GET({ locals }) {
  try {
    const projects = await getUserProjects(locals.user.id);
    return new Response(JSON.stringify(projects), {
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
async function POST({ request, locals }) {
  try {
    const data = await request.json();
    const project = await createProject(locals.user.id, data);
    return new Response(JSON.stringify(project), {
      status: 201,
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
  GET,
  POST
};
