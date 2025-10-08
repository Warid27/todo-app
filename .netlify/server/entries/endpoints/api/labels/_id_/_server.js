import { a as getLabel, u as updateLabel, d as deleteLabel } from "../../../../../chunks/labelController.js";
async function GET({ params }) {
  try {
    const label = await getLabel(params.id);
    return new Response(JSON.stringify(label), {
      status: 200,
      headers: {
        "content-type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 404,
      headers: {
        "content-type": "application/json"
      }
    });
  }
}
async function PUT({ params, request }) {
  try {
    const data = await request.json();
    const label = await updateLabel(params.id, data);
    return new Response(JSON.stringify(label), {
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
async function DELETE({ params }) {
  try {
    const label = await deleteLabel(params.id);
    return new Response(JSON.stringify(label), {
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
