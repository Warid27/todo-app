import { prisma } from './prisma.js';

/**
 * Create a new project
 * @param {Object} data - Project data
 * @returns {Promise<Object>} Created project
 */
export async function create(data) {
	return await prisma.project.create({
		data,
		include: {
			owner: {
				select: {
					id: true,
					username: true
				}
			},
			members: {
				include: {
					user: {
						select: {
							id: true,
							username: true
						}
					}
				}
			},
			tasks: true
		}
	});
}

/**
 * Find a project by ID
 * @param {string} id - Project ID
 * @returns {Promise<Object|null>} Project object or null
 */
export async function findById(id) {
	return await prisma.project.findUnique({
		where: { id },
		include: {
			owner: {
				select: {
					id: true,
					username: true
				}
			},
			members: {
				include: {
					user: {
						select: {
							id: true,
							username: true
						}
					}
				}
			},
			tasks: {
				include: {
					assignee: {
						select: {
							id: true,
							username: true
						}
					},
					taskLabels: {
						include: {
							label: true
						}
					}
				}
			}
		}
	});
}

/**
 * Find all projects for a user (owned or member)
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of projects
 */
export async function findByUser(userId) {
	return await prisma.project.findMany({
		where: {
			OR: [
				{ ownerId: userId },
				{
					members: {
						some: {
							userId: userId
						}
					}
				}
			]
		},
		include: {
			owner: {
				select: {
					id: true,
					username: true
				}
			},
			members: {
				include: {
					user: {
						select: {
							id: true,
							username: true
						}
					}
				}
			},
			tasks: {
				select: {
					id: true,
					status: true
				}
			}
		},
		orderBy: {
			updatedAt: 'desc'
		}
	});
}

/**
 * Update a project
 * @param {string} id - Project ID
 * @param {Object} data - Data to update
 * @returns {Promise<Object>} Updated project
 */
export async function update(id, data) {
	return await prisma.project.update({
		where: { id },
		data,
		include: {
			owner: {
				select: {
					id: true,
					username: true
				}
			},
			members: {
				include: {
					user: {
						select: {
							id: true,
							username: true
						}
					}
				}
			}
		}
	});
}

/**
 * Delete a project
 * @param {string} id - Project ID
 * @returns {Promise<Object>} Deleted project
 */
export async function remove(id) {
	return await prisma.project.delete({
		where: { id }
	});
}

/**
 * Get project statistics
 * @param {string} id - Project ID
 * @returns {Promise<Object>} Project statistics
 */
export async function getStats(id) {
	const tasks = await prisma.task.groupBy({
		by: ['status'],
		where: { projectId: id },
		_count: true
	});

	return {
		total: tasks.reduce((sum, item) => sum + item._count, 0),
		todo: tasks.find((t) => t.status === 'Todo')?._count || 0,
		inProgress: tasks.find((t) => t.status === 'In Progress')?._count || 0,
		done: tasks.find((t) => t.status === 'Done')?._count || 0
	};
}
