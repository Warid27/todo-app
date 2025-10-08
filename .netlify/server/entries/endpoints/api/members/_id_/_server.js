import { u as updateMemberRole, r as removeMember } from "../../../../../chunks/projectController.js";
async function PUT({ params, request, locals }) {
  try {
    const data = await request.json();
    const member = await updateMemberRole(params.id, locals.user.id, data.role);
    return new Response(JSON.stringify(member), {
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
    const member = await removeMember(params.id, locals.user.id);
    return new Response(JSON.stringify(member), {
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
  PUT
};
