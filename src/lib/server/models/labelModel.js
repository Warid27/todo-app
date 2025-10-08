import { prisma } from './prisma.js';

/**
 * Create a new label
 * @param {Object} data - Label data
 * @returns {Promise<Object>} Created label
 */
export async function create(data) {
	return await prisma.label.create({
		data
	});
}

/**
 * Find all labels
 * @returns {Promise<Array>} Array of labels
 */
export async function findAll() {
	return await prisma.label.findMany({
		orderBy: {
			name: 'asc'
		}
	});
}

/**
 * Find a label by ID
 * @param {string} id - Label ID
 * @returns {Promise<Object|null>} Label object or null
 */
export async function findById(id) {
	return await prisma.label.findUnique({
		where: { id }
	});
}

/**
 * Find a label by name
 * @param {string} name - Label name
 * @returns {Promise<Object|null>} Label object or null
 */
export async function findByName(name) {
	return await prisma.label.findUnique({
		where: { name }
	});
}

/**
 * Update a label
 * @param {string} id - Label ID
 * @param {Object} data - Data to update
 * @returns {Promise<Object>} Updated label
 */
export async function update(id, data) {
	return await prisma.label.update({
		where: { id },
		data
	});
}

/**
 * Delete a label
 * @param {string} id - Label ID
 * @returns {Promise<Object>} Deleted label
 */
export async function remove(id) {
	return await prisma.label.delete({
		where: { id }
	});
}
