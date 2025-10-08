import { f as findById, a as findById$1, u as updateRole, r as remove, b as findByUser, c as create, i as isMember, d as update, e as remove$1, g as findByProjectAndUser, h as create$1, j as getStats } from "./projectMemberModel.js";
async function createProject(ownerId, data) {
  if (!data.name || data.name.trim().length < 3) {
    throw new Error("Project name must be at least 3 characters long");
  }
  const project = await create({
    name: data.name.trim(),
    description: data.description?.trim() || null,
    startDate: data.startDate ? new Date(data.startDate) : null,
    endDate: data.endDate ? new Date(data.endDate) : null,
    ownerId
  });
  return project;
}
async function getProject(projectId, userId) {
  const project = await findById$1(projectId);
  if (!project) {
    throw new Error("Project not found");
  }
  const isOwner = project.ownerId === userId;
  const isMember$1 = await isMember(projectId, userId);
  if (!isOwner && !isMember$1) {
    throw new Error("You do not have access to this project");
  }
  return project;
}
async function getUserProjects(userId) {
  return await findByUser(userId);
}
async function updateProject(projectId, userId, data) {
  const project = await findById$1(projectId);
  if (!project) {
    throw new Error("Project not found");
  }
  if (project.ownerId !== userId) {
    throw new Error("Only project owner can update the project");
  }
  if (data.name && data.name.trim().length < 3) {
    throw new Error("Project name must be at least 3 characters long");
  }
  const updateData = {};
  if (data.name) updateData.name = data.name.trim();
  if (data.description !== void 0) updateData.description = data.description?.trim() || null;
  if (data.startDate !== void 0)
    updateData.startDate = data.startDate ? new Date(data.startDate) : null;
  if (data.endDate !== void 0) updateData.endDate = data.endDate ? new Date(data.endDate) : null;
  return await update(projectId, updateData);
}
async function deleteProject(projectId, userId) {
  const project = await findById$1(projectId);
  if (!project) {
    throw new Error("Project not found");
  }
  if (project.ownerId !== userId) {
    throw new Error("Only project owner can delete the project");
  }
  return await remove$1(projectId);
}
async function addMember(projectId, ownerId, data) {
  const project = await findById$1(projectId);
  if (!project) {
    throw new Error("Project not found");
  }
  if (project.ownerId !== ownerId) {
    throw new Error("Only project owner can add members");
  }
  if (!data.userId) {
    throw new Error("User ID is required");
  }
  if (!data.role || !["manager", "developer", "qa"].includes(data.role)) {
    throw new Error("Role must be one of: manager, developer, qa");
  }
  const existingMember = await findByProjectAndUser(projectId, data.userId);
  if (existingMember) {
    throw new Error("User is already a member of this project");
  }
  return await create$1({
    projectId,
    userId: data.userId,
    role: data.role
  });
}
async function updateMemberRole(memberId, ownerId, role) {
  if (!["manager", "developer", "qa"].includes(role)) {
    throw new Error("Role must be one of: manager, developer, qa");
  }
  const member = await findById(memberId);
  if (!member) {
    throw new Error("Member not found");
  }
  const project = await findById$1(member.projectId);
  if (project.ownerId !== ownerId) {
    throw new Error("Only project owner can update member roles");
  }
  return await updateRole(memberId, role);
}
async function removeMember(memberId, ownerId) {
  const member = await findById(memberId);
  if (!member) {
    throw new Error("Member not found");
  }
  const project = await findById$1(member.projectId);
  if (project.ownerId !== ownerId) {
    throw new Error("Only project owner can remove members");
  }
  return await remove(memberId);
}
async function getProjectStats(projectId, userId) {
  await getProject(projectId, userId);
  return await getStats(projectId);
}
export {
  getProject as a,
  updateProject as b,
  createProject as c,
  deleteProject as d,
  addMember as e,
  getProjectStats as f,
  getUserProjects as g,
  removeMember as r,
  updateMemberRole as u
};
