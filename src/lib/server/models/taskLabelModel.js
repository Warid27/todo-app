import { prisma } from './prisma.js';

/**
 * Add a label to a task
 * @param {Object} data - TaskLabel data
 * @returns {Promise<Object>} Created task label
 */
export async function create(data) {
	return await prisma.taskLabel.create({
		data,
		include: {
			label: true
		}
	});
}

/**
 * Find labels for a task
 * @param {string} taskId - Task ID
 * @returns {Promise<Array>} Array of task labels
 */
export async function findByTask(taskId) {
	return await prisma.taskLabel.findMany({
		where: { taskId },
		include: {
			label: true
		}
	});
}

/**
 * Remove a label from a task
 * @param {string} taskId - Task ID
 * @param {string} labelId - Label ID
 * @returns {Promise<Object>} Deleted task label
 */
export async function remove(taskId, labelId) {
	return await prisma.taskLabel.delete({
		where: {
			taskId_labelId: {
				taskId,
				labelId
			}
		}
	});
}

/**
 * Remove all labels from a task
 * @param {string} taskId - Task ID
 * @returns {Promise<Object>} Delete result
 */
export async function removeAllByTask(taskId) {
	return await prisma.taskLabel.deleteMany({
		where: { taskId }
	});
}
