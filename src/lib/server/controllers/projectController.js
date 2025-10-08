import * as ProjectModel from '../models/projectModel.js';
import * as ProjectMemberModel from '../models/projectMemberModel.js';

/**
 * Create a new project
 * @param {string} ownerId - User ID of the project owner
 * @param {Object} data - Project data
 * @returns {Promise<Object>} Created project
 * @throws {Error} If validation fails
 */
export async function createProject(ownerId, data) {
	// Validation
	if (!data.name || data.name.trim().length < 3) {
		throw new Error('Project name must be at least 3 characters long');
	}

	// Create project
	const project = await ProjectModel.create({
		name: data.name.trim(),
		description: data.description?.trim() || null,
		startDate: data.startDate ? new Date(data.startDate) : null,
		endDate: data.endDate ? new Date(data.endDate) : null,
		ownerId
	});

	return project;
}

/**
 * Get a project by ID
 * @param {string} projectId - Project ID
 * @param {string} userId - Current user ID (for authorization)
 * @returns {Promise<Object>} Project object
 * @throws {Error} If project not found or user not authorized
 */
export async function getProject(projectId, userId) {
	const project = await ProjectModel.findById(projectId);

	if (!project) {
		throw new Error('Project not found');
	}

	// Check if user has access (owner or member)
	const isOwner = project.ownerId === userId;
	const isMember = await ProjectMemberModel.isMember(projectId, userId);

	if (!isOwner && !isMember) {
		throw new Error('You do not have access to this project');
	}

	return project;
}

/**
 * Get all projects for a user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of projects
 */
export async function getUserProjects(userId) {
	return await ProjectModel.findByUser(userId);
}

/**
 * Update a project
 * @param {string} projectId - Project ID
 * @param {string} userId - Current user ID (for authorization)
 * @param {Object} data - Data to update
 * @returns {Promise<Object>} Updated project
 * @throws {Error} If not authorized or validation fails
 */
export async function updateProject(projectId, userId, data) {
	const project = await ProjectModel.findById(projectId);

	if (!project) {
		throw new Error('Project not found');
	}

	// Only owner can update project
	if (project.ownerId !== userId) {
		throw new Error('Only project owner can update the project');
	}

	// Validation
	if (data.name && data.name.trim().length < 3) {
		throw new Error('Project name must be at least 3 characters long');
	}

	const updateData = {};
	if (data.name) updateData.name = data.name.trim();
	if (data.description !== undefined) updateData.description = data.description?.trim() || null;
	if (data.startDate !== undefined)
		updateData.startDate = data.startDate ? new Date(data.startDate) : null;
	if (data.endDate !== undefined) updateData.endDate = data.endDate ? new Date(data.endDate) : null;

	return await ProjectModel.update(projectId, updateData);
}

/**
 * Delete a project
 * @param {string} projectId - Project ID
 * @param {string} userId - Current user ID (for authorization)
 * @returns {Promise<Object>} Deleted project
 * @throws {Error} If not authorized
 */
export async function deleteProject(projectId, userId) {
	const project = await ProjectModel.findById(projectId);

	if (!project) {
		throw new Error('Project not found');
	}

	// Only owner can delete project
	if (project.ownerId !== userId) {
		throw new Error('Only project owner can delete the project');
	}

	return await ProjectModel.remove(projectId);
}

/**
 * Add a member to a project
 * @param {string} projectId - Project ID
 * @param {string} ownerId - Project owner ID (for authorization)
 * @param {Object} data - Member data
 * @returns {Promise<Object>} Created project member
 * @throws {Error} If not authorized or validation fails
 */
export async function addMember(projectId, ownerId, data) {
	const project = await ProjectModel.findById(projectId);

	if (!project) {
		throw new Error('Project not found');
	}

	// Only owner can add members
	if (project.ownerId !== ownerId) {
		throw new Error('Only project owner can add members');
	}

	// Validation
	if (!data.userId) {
		throw new Error('User ID is required');
	}

	if (!data.role || !['manager', 'developer', 'qa'].includes(data.role)) {
		throw new Error('Role must be one of: manager, developer, qa');
	}

	// Check if already a member
	const existingMember = await ProjectMemberModel.findByProjectAndUser(projectId, data.userId);
	if (existingMember) {
		throw new Error('User is already a member of this project');
	}

	return await ProjectMemberModel.create({
		projectId,
		userId: data.userId,
		role: data.role
	});
}

/**
 * Update a member's role
 * @param {string} memberId - Project member ID
 * @param {string} ownerId - Project owner ID (for authorization)
 * @param {string} role - New role
 * @returns {Promise<Object>} Updated project member
 * @throws {Error} If not authorized or validation fails
 */
export async function updateMemberRole(memberId, ownerId, role) {
	// Validation
	if (!['manager', 'developer', 'qa'].includes(role)) {
		throw new Error('Role must be one of: manager, developer, qa');
	}

	// Get member and check authorization
	const member = await ProjectMemberModel.findById(memberId);
	if (!member) {
		throw new Error('Member not found');
	}

	const project = await ProjectModel.findById(member.projectId);
	if (project.ownerId !== ownerId) {
		throw new Error('Only project owner can update member roles');
	}

	return await ProjectMemberModel.updateRole(memberId, role);
}

/**
 * Remove a member from a project
 * @param {string} memberId - Project member ID
 * @param {string} ownerId - Project owner ID (for authorization)
 * @returns {Promise<Object>} Deleted project member
 * @throws {Error} If not authorized
 */
export async function removeMember(memberId, ownerId) {
	const member = await ProjectMemberModel.findById(memberId);
	if (!member) {
		throw new Error('Member not found');
	}

	const project = await ProjectModel.findById(member.projectId);
	if (project.ownerId !== ownerId) {
		throw new Error('Only project owner can remove members');
	}

	return await ProjectMemberModel.remove(memberId);
}

/**
 * Get project statistics
 * @param {string} projectId - Project ID
 * @param {string} userId - Current user ID (for authorization)
 * @returns {Promise<Object>} Project statistics
 * @throws {Error} If not authorized
 */
export async function getProjectStats(projectId, userId) {
	// Check access
	await getProject(projectId, userId);

	return await ProjectModel.getStats(projectId);
}
