import { g as getProjectTasks, a as getUserTasks, c as createTask } from "../../../../chunks/taskController.js";
async function GET({ url, locals }) {
  try {
    const projectId = url.searchParams.get("projectId");
    if (projectId) {
      const filters = {};
      const status = url.searchParams.get("status");
      const priority = url.searchParams.get("priority");
      const assigneeId = url.searchParams.get("assigneeId");
      const labelId = url.searchParams.get("labelId");
      if (status) filters.status = status;
      if (priority) filters.priority = priority;
      if (assigneeId) filters.assigneeId = assigneeId;
      if (labelId) filters.labelId = labelId;
      const tasks = await getProjectTasks(projectId, locals.user.id, filters);
      return new Response(JSON.stringify(tasks), {
        status: 200,
        headers: {
          "content-type": "application/json"
        }
      });
    } else {
      const tasks = await getUserTasks(locals.user.id);
      return new Response(JSON.stringify(tasks), {
        status: 200,
        headers: {
          "content-type": "application/json"
        }
      });
    }
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
    const task = await createTask(locals.user.id, data);
    return new Response(JSON.stringify(task), {
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
