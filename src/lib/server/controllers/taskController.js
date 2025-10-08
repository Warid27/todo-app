import * as TaskModel from '../models/taskModel.js';
import * as ProjectModel from '../models/projectModel.js';
import * as ProjectMemberModel from '../models/projectMemberModel.js';
import * as TaskLabelModel from '../models/taskLabelModel.js';

/**
 * Check if user has access to a project
 * @param {string} projectId - Project ID
 * @param {string} userId - User ID
 * @returns {Promise<boolean>}
 * @throws {Error} If no access
 */
async function checkProjectAccess(projectId, userId) {
	const project = await ProjectModel.findById(projectId);

	if (!project) {
		throw new Error('Project not found');
	}

	const isOwner = project.ownerId === userId;
	const isMember = await ProjectMemberModel.isMember(projectId, userId);

	if (!isOwner && !isMember) {
		throw new Error('You do not have access to this project');
	}

	return true;
}

/**
 * Create a new task
 * @param {string} userId - Current user ID (for authorization)
 * @param {Object} data - Task data
 * @returns {Promise<Object>} Created task
 * @throws {Error} If validation fails or not authorized
 */
export async function createTask(userId, data) {
	// Validation
	if (!data.projectId) {
		throw new Error('Project ID is required');
	}

	if (!data.title || data.title.trim().length < 3) {
		throw new Error('Task title must be at least 3 characters long');
	}

	// Check project access
	await checkProjectAccess(data.projectId, userId);

	// Validate status
	const validStatuses = ['Todo', 'In Progress', 'Done'];
	if (data.status && !validStatuses.includes(data.status)) {
		throw new Error('Invalid status');
	}

	// Validate priority
	const validPriorities = ['Low', 'Medium', 'High'];
	if (data.priority && !validPriorities.includes(data.priority)) {
		throw new Error('Invalid priority');
	}

	// Create task
	const taskData = {
		projectId: data.projectId,
		title: data.title.trim(),
		description: data.description?.trim() || null,
		status: data.status || 'Todo',
		priority: data.priority || 'Medium',
		assigneeId: data.assigneeId || null,
		dueDate: data.dueDate ? new Date(data.dueDate) : null
	};

	const task = await TaskModel.create(taskData);

	// Add labels if provided
	if (data.labelIds && Array.isArray(data.labelIds)) {
		for (const labelId of data.labelIds) {
			await TaskLabelModel.create({
				taskId: task.id,
				labelId
			});
		}
		// Refetch task with labels
		return await TaskModel.findById(task.id);
	}

	return task;
}

/**
 * Get a task by ID
 * @param {string} taskId - Task ID
 * @param {string} userId - Current user ID (for authorization)
 * @returns {Promise<Object>} Task object
 * @throws {Error} If task not found or not authorized
 */
export async function getTask(taskId, userId) {
	const task = await TaskModel.findById(taskId);

	if (!task) {
		throw new Error('Task not found');
	}

	// Check project access
	await checkProjectAccess(task.projectId, userId);

	return task;
}

/**
 * Get tasks for a project
 * @param {string} projectId - Project ID
 * @param {string} userId - Current user ID (for authorization)
 * @param {Object} filters - Optional filters
 * @returns {Promise<Array>} Array of tasks
 * @throws {Error} If not authorized
 */
export async function getProjectTasks(projectId, userId, filters = {}) {
	// Check project access
	await checkProjectAccess(projectId, userId);

	return await TaskModel.findByProject(projectId, filters);
}

/**
 * Get tasks by status for Kanban board
 * @param {string} projectId - Project ID
 * @param {string} userId - Current user ID (for authorization)
 * @returns {Promise<Object>} Tasks grouped by status
 * @throws {Error} If not authorized
 */
export async function getTasksByStatus(projectId, userId) {
	// Check project access
	await checkProjectAccess(projectId, userId);

	return await TaskModel.getTasksByStatus(projectId);
}

/**
 * Get tasks assigned to current user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of tasks
 */
export async function getUserTasks(userId) {
	return await TaskModel.findByAssignee(userId);
}

/**
 * Update a task
 * @param {string} taskId - Task ID
 * @param {string} userId - Current user ID (for authorization)
 * @param {Object} data - Data to update
 * @returns {Promise<Object>} Updated task
 * @throws {Error} If not authorized or validation fails
 */
export async function updateTask(taskId, userId, data) {
	const task = await TaskModel.findById(taskId);

	if (!task) {
		throw new Error('Task not found');
	}

	// Check project access
	await checkProjectAccess(task.projectId, userId);

	// Validation
	if (data.title && data.title.trim().length < 3) {
		throw new Error('Task title must be at least 3 characters long');
	}

	if (data.status) {
		const validStatuses = ['Todo', 'In Progress', 'Done'];
		if (!validStatuses.includes(data.status)) {
			throw new Error('Invalid status');
		}
	}

	if (data.priority) {
		const validPriorities = ['Low', 'Medium', 'High'];
		if (!validPriorities.includes(data.priority)) {
			throw new Error('Invalid priority');
		}
	}

	// Build update data
	const updateData = {};
	if (data.title) updateData.title = data.title.trim();
	if (data.description !== undefined)
		updateData.description = data.description?.trim() || null;
	if (data.status) updateData.status = data.status;
	if (data.priority) updateData.priority = data.priority;
	if (data.assigneeId !== undefined) updateData.assigneeId = data.assigneeId || null;
	if (data.dueDate !== undefined)
		updateData.dueDate = data.dueDate ? new Date(data.dueDate) : null;

	const updatedTask = await TaskModel.update(taskId, updateData);

	// Update labels if provided
	if (data.labelIds !== undefined && Array.isArray(data.labelIds)) {
		// Remove all existing labels
		await TaskLabelModel.removeAllByTask(taskId);

		// Add new labels
		for (const labelId of data.labelIds) {
			await TaskLabelModel.create({
				taskId,
				labelId
			});
		}

		// Refetch task with labels
		return await TaskModel.findById(taskId);
	}

	return updatedTask;
}

/**
 * Delete a task
 * @param {string} taskId - Task ID
 * @param {string} userId - Current user ID (for authorization)
 * @returns {Promise<Object>} Deleted task
 * @throws {Error} If not authorized
 */
export async function deleteTask(taskId, userId) {
	const task = await TaskModel.findById(taskId);

	if (!task) {
		throw new Error('Task not found');
	}

	// Check project access
	await checkProjectAccess(task.projectId, userId);

	return await TaskModel.remove(taskId);
}

/**
 * Add a label to a task
 * @param {string} taskId - Task ID
 * @param {string} userId - Current user ID (for authorization)
 * @param {string} labelId - Label ID
 * @returns {Promise<Object>} Created task label
 * @throws {Error} If not authorized
 */
export async function addLabel(taskId, userId, labelId) {
	const task = await TaskModel.findById(taskId);

	if (!task) {
		throw new Error('Task not found');
	}

	// Check project access
	await checkProjectAccess(task.projectId, userId);

	return await TaskLabelModel.create({
		taskId,
		labelId
	});
}

/**
 * Remove a label from a task
 * @param {string} taskId - Task ID
 * @param {string} userId - Current user ID (for authorization)
 * @param {string} labelId - Label ID
 * @returns {Promise<Object>} Deleted task label
 * @throws {Error} If not authorized
 */
export async function removeLabel(taskId, userId, labelId) {
	const task = await TaskModel.findById(taskId);

	if (!task) {
		throw new Error('Task not found');
	}

	// Check project access
	await checkProjectAccess(task.projectId, userId);

	return await TaskLabelModel.remove(taskId, labelId);
}
