import * as LabelController from '$lib/server/controllers/labelController.js';

/**
 * Get all labels
 */
export async function GET() {
	try {
		const labels = await LabelController.getAllLabels();

		return new Response(JSON.stringify(labels), {
			status: 200,
			headers: {
				'content-type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
			headers: {
				'content-type': 'application/json'
			}
		});
	}
}

/**
 * Create a new label
 */
export async function POST({ request }) {
	try {
		const data = await request.json();

		const label = await LabelController.createLabel(data);

		return new Response(JSON.stringify(label), {
			status: 201,
			headers: {
				'content-type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
			headers: {
				'content-type': 'application/json'
			}
		});
	}
}
