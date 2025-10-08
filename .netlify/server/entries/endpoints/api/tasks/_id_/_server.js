import { d as getTask, u as updateTask, e as deleteTask } from "../../../../../chunks/taskController.js";
async function GET({ params, locals }) {
  try {
    const task = await getTask(params.id, locals.user.id);
    return new Response(JSON.stringify(task), {
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
    const task = await updateTask(params.id, locals.user.id, data);
    return new Response(JSON.stringify(task), {
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
    const task = await deleteTask(params.id, locals.user.id);
    return new Response(JSON.stringify(task), {
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
