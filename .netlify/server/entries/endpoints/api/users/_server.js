import { f as findAll } from "../../../../chunks/userModel.js";
async function GET() {
  try {
    const users = await findAll();
    return new Response(JSON.stringify(users), {
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
