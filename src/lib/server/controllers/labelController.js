import * as LabelModel from '../models/labelModel.js';

/**
 * Create a new label
 * @param {Object} data - Label data
 * @returns {Promise<Object>} Created label
 * @throws {Error} If validation fails
 */
export async function createLabel(data) {
	// Validation
	if (!data.name || data.name.trim().length < 2) {
		throw new Error('Label name must be at least 2 characters long');
	}

	if (!data.color || !/^#[0-9A-F]{6}$/i.test(data.color)) {
		throw new Error('Invalid color format. Use hex format like #FF5733');
	}

	// Check if label with same name exists
	const existing = await LabelModel.findByName(data.name.trim());
	if (existing) {
		throw new Error('A label with this name already exists');
	}

	return await LabelModel.create({
		name: data.name.trim(),
		color: data.color.toUpperCase()
	});
}

/**
 * Get all labels
 * @returns {Promise<Array>} Array of labels
 */
export async function getAllLabels() {
	return await LabelModel.findAll();
}

/**
 * Get a label by ID
 * @param {string} labelId - Label ID
 * @returns {Promise<Object>} Label object
 * @throws {Error} If label not found
 */
export async function getLabel(labelId) {
	const label = await LabelModel.findById(labelId);

	if (!label) {
		throw new Error('Label not found');
	}

	return label;
}

/**
 * Update a label
 * @param {string} labelId - Label ID
 * @param {Object} data - Data to update
 * @returns {Promise<Object>} Updated label
 * @throws {Error} If validation fails
 */
export async function updateLabel(labelId, data) {
	const label = await LabelModel.findById(labelId);

	if (!label) {
		throw new Error('Label not found');
	}

	// Validation
	if (data.name) {
		if (data.name.trim().length < 2) {
			throw new Error('Label name must be at least 2 characters long');
		}

		// Check if another label with same name exists
		const existing = await LabelModel.findByName(data.name.trim());
		if (existing && existing.id !== labelId) {
			throw new Error('A label with this name already exists');
		}
	}

	if (data.color && !/^#[0-9A-F]{6}$/i.test(data.color)) {
		throw new Error('Invalid color format. Use hex format like #FF5733');
	}

	const updateData = {};
	if (data.name) updateData.name = data.name.trim();
	if (data.color) updateData.color = data.color.toUpperCase();

	return await LabelModel.update(labelId, updateData);
}

/**
 * Delete a label
 * @param {string} labelId - Label ID
 * @returns {Promise<Object>} Deleted label
 * @throws {Error} If label not found
 */
export async function deleteLabel(labelId) {
	const label = await LabelModel.findById(labelId);

	if (!label) {
		throw new Error('Label not found');
	}

	return await LabelModel.remove(labelId);
}
