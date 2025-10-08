import * as LabelController from '$lib/server/controllers/labelController.js';

/**
 * Get a label by ID
 */
export async function GET({ params }) {
	try {
		const label = await LabelController.getLabel(params.id);

		return new Response(JSON.stringify(label), {
			status: 200,
			headers: {
				'content-type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 404,
			headers: {
				'content-type': 'application/json'
			}
		});
	}
}

/**
 * Update a label
 */
export async function PUT({ params, request }) {
	try {
		const data = await request.json();

		const label = await LabelController.updateLabel(params.id, data);

		return new Response(JSON.stringify(label), {
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
 * Delete a label
 */
export async function DELETE({ params }) {
	try {
		const label = await LabelController.deleteLabel(params.id);

		return new Response(JSON.stringify(label), {
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
