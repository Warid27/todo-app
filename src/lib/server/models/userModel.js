import { prisma } from './prisma.js';

/**
 * Create a new user
 * @param {Object} data - User data
 * @param {string} data.username - Username
 * @param {string} data.password - Hashed password
 * @returns {Promise<Object>} Created user
 */
export async function create(data) {
	return await prisma.user.create({
		data,
		select: {
			id: true,
			username: true,
			createdAt: true,
			updatedAt: true
		}
	});
}

/**
 * Find a user by username
 * @param {string} username - Username to search for
 * @returns {Promise<Object|null>} User object or null
 */
export async function findByUsername(username) {
	return await prisma.user.findUnique({
		where: { username }
	});
}

/**
 * Find a user by ID
 * @param {string} id - User ID
 * @returns {Promise<Object|null>} User object or null
 */
export async function findById(id) {
	return await prisma.user.findUnique({
		where: { id },
		select: {
			id: true,
			username: true,
			createdAt: true,
			updatedAt: true
		}
	});
}

/**
 * Get all users (for assigning tasks)
 * @returns {Promise<Array>} Array of users
 */
export async function findAll() {
	return await prisma.user.findMany({
		select: {
			id: true,
			username: true
		},
		orderBy: {
			username: 'asc'
		}
	});
}

/**
 * Update a user
 * @param {string} id - User ID
 * @param {Object} data - Data to update
 * @returns {Promise<Object>} Updated user
 */
export async function update(id, data) {
	return await prisma.user.update({
		where: { id },
		data,
		select: {
			id: true,
			username: true,
			updatedAt: true
		}
	});
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise<Object>} Deleted user
 */
export async function remove(id) {
	return await prisma.user.delete({
		where: { id }
	});
}
