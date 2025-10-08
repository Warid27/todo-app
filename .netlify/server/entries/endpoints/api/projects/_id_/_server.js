import { a as getProject, b as updateProject, d as deleteProject } from "../../../../../chunks/projectController.js";
async function GET({ params, locals }) {
  try {
    const project = await getProject(params.id, locals.user.id);
    return new Response(JSON.stringify(project), {
      status: 200,
      headers: {
        "content-type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.message.includes("not found") ? 404 : 403,
      headers: {
        "content-type": "application/json"
      }
    });
  }
}
async function PUT({ params, request, locals }) {
  try {
    const data = await request.json();
    const project = await updateProject(params.id, locals.user.id, data);
    return new Response(JSON.stringify(project), {
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
async function DELETE({ params, locals }) {
  try {
    const project = await deleteProject(params.id, locals.user.id);
    return new Response(JSON.stringify(project), {
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
  DELETE,
  GET,
  PUT
};
