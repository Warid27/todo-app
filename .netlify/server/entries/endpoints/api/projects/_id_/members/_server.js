import { e as addMember } from "../../../../../../chunks/projectController.js";
async function POST({ params, request, locals }) {
  try {
    const data = await request.json();
    const member = await addMember(params.id, locals.user.id, data);
    return new Response(JSON.stringify(member), {
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
  POST
};
