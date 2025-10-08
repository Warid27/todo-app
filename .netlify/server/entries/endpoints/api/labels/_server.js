import { g as getAllLabels, c as createLabel } from "../../../../chunks/labelController.js";
async function GET() {
  try {
    const labels = await getAllLabels();
    return new Response(JSON.stringify(labels), {
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
async function POST({ request }) {
  try {
    const data = await request.json();
    const label = await createLabel(data);
    return new Response(JSON.stringify(label), {
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
