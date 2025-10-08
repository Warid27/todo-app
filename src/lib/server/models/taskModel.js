import { prisma } from './prisma.js';

/**
 * Create a new task
 * @param {Object} data - Task data
 * @returns {Promise<Object>} Created task
 */
export async function create(data) {
	return await prisma.task.create({
		data,
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
	});
}

/**
 * Find a task by ID
 * @param {string} id - Task ID
 * @returns {Promise<Object|null>} Task object or null
 */
export async function findById(id) {
	return await prisma.task.findUnique({
		where: { id },
		include: {
			assignee: {
				select: {
					id: true,
					username: true
				}
			},
			project: {
				select: {
					id: true,
					name: true
				}
			},
			taskLabels: {
				include: {
					label: true
				}
			}
		}
	});
}

/**
 * Find tasks by project with optional filters
 * @param {string} projectId - Project ID
 * @param {Object} filters - Optional filters
 * @returns {Promise<Array>} Array of tasks
 */
export async function findByProject(projectId, filters = {}) {
	const where = { projectId };

	if (filters.status) {
		where.status = filters.status;
	}

	if (filters.priority) {
		where.priority = filters.priority;
	}

	if (filters.assigneeId) {
		where.assigneeId = filters.assigneeId;
	}

	if (filters.labelId) {
		where.taskLabels = {
			some: {
				labelId: filters.labelId
			}
		};
	}

	return await prisma.task.findMany({
		where,
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
		},
		orderBy: [{ createdAt: 'desc' }]
	});
}

/**
 * Find tasks assigned to a user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of tasks
 */
export async function findByAssignee(userId) {
	return await prisma.task.findMany({
		where: { assigneeId: userId },
		include: {
			project: {
				select: {
					id: true,
					name: true
				}
			},
			taskLabels: {
				include: {
					label: true
				}
			}
		},
		orderBy: [{ dueDate: 'asc' }, { createdAt: 'desc' }]
	});
}

/**
 * Update a task
 * @param {string} id - Task ID
 * @param {Object} data - Data to update
 * @returns {Promise<Object>} Updated task
 */
export async function update(id, data) {
	return await prisma.task.update({
		where: { id },
		data,
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
	});
}

/**
 * Delete a task
 * @param {string} id - Task ID
 * @returns {Promise<Object>} Deleted task
 */
export async function remove(id) {
	return await prisma.task.delete({
		where: { id }
	});
}

/**
 * Get tasks grouped by status for a project
 * @param {string} projectId - Project ID
 * @returns {Promise<Object>} Tasks grouped by status
 */
export async function getTasksByStatus(projectId) {
	const tasks = await findByProject(projectId);

	return {
		todo: tasks.filter((t) => t.status === 'Todo'),
		inProgress: tasks.filter((t) => t.status === 'In Progress'),
		done: tasks.filter((t) => t.status === 'Done')
	};
}
