import { prisma } from './prisma.js';

/**
 * Add a member to a project
 * @param {Object} data - Member data
 * @returns {Promise<Object>} Created project member
 */
export async function create(data) {
	return await prisma.projectMember.create({
		data,
		include: {
			user: {
				select: {
					id: true,
					username: true
				}
			}
		}
	});
}

/**
 * Find project members
 * @param {string} projectId - Project ID
 * @returns {Promise<Array>} Array of project members
 */
export async function findByProject(projectId) {
	return await prisma.projectMember.findMany({
		where: { projectId },
		include: {
			user: {
				select: {
					id: true,
					username: true
				}
			}
		},
		orderBy: {
			joinedAt: 'asc'
		}
	});
}

/**
 * Find a specific project member by ID
 * @param {string} id - Project member ID
 * @returns {Promise<Object|null>} Project member or null
 */
export async function findById(id) {
	return await prisma.projectMember.findUnique({
		where: { id },
		include: {
			project: true,
			user: {
				select: {
					id: true,
					username: true
				}
			}
		}
	});
}

/**
 * Find a specific project member
 * @param {string} projectId - Project ID
 * @param {string} userId - User ID
 * @returns {Promise<Object|null>} Project member or null
 */
export async function findByProjectAndUser(projectId, userId) {
	return await prisma.projectMember.findUnique({
		where: {
			projectId_userId: {
				projectId,
				userId
			}
		}
	});
}

/**
 * Update a project member's role
 * @param {string} id - Project member ID
 * @param {string} role - New role
 * @returns {Promise<Object>} Updated project member
 */
export async function updateRole(id, role) {
	return await prisma.projectMember.update({
		where: { id },
		data: { role },
		include: {
			user: {
				select: {
					id: true,
					username: true
				}
			}
		}
	});
}

/**
 * Remove a member from a project
 * @param {string} id - Project member ID
 * @returns {Promise<Object>} Deleted project member
 */
export async function remove(id) {
	return await prisma.projectMember.delete({
		where: { id }
	});
}

/**
 * Check if user is a member of a project
 * @param {string} projectId - Project ID
 * @param {string} userId - User ID
 * @returns {Promise<boolean>} True if user is member
 */
export async function isMember(projectId, userId) {
	const member = await findByProjectAndUser(projectId, userId);
	return member !== null;
}
