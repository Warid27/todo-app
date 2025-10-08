import { f as getProjectStats } from "../../../../../../chunks/projectController.js";
async function GET({ params, locals }) {
  try {
    const stats = await getProjectStats(params.id, locals.user.id);
    return new Response(JSON.stringify(stats), {
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
