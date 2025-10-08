import { p as prisma } from "./prisma.js";
import { a as findById$1, i as isMember } from "./projectMemberModel.js";
async function create$1(data) {
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
async function findById(id) {
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
async function findByProject(projectId, filters = {}) {
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
    orderBy: [{ createdAt: "desc" }]
  });
}
async function findByAssignee(userId) {
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
    orderBy: [{ dueDate: "asc" }, { createdAt: "desc" }]
  });
}
async function update(id, data) {
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
async function remove(id) {
  return await prisma.task.delete({
    where: { id }
  });
}
async function getTasksByStatus$1(projectId) {
  const tasks = await findByProject(projectId);
  return {
    todo: tasks.filter((t) => t.status === "Todo"),
    inProgress: tasks.filter((t) => t.status === "In Progress"),
    done: tasks.filter((t) => t.status === "Done")
  };
}
async function create(data) {
  return await prisma.taskLabel.create({
    data,
    include: {
      label: true
    }
  });
}
async function removeAllByTask(taskId) {
  return await prisma.taskLabel.deleteMany({
    where: { taskId }
  });
}
async function checkProjectAccess(projectId, userId) {
  const project = await findById$1(projectId);
  if (!project) {
    throw new Error("Project not found");
  }
  const isOwner = project.ownerId === userId;
  const isMember$1 = await isMember(projectId, userId);
  if (!isOwner && !isMember$1) {
    throw new Error("You do not have access to this project");
  }
  return true;
}
async function createTask(userId, data) {
  if (!data.projectId) {
    throw new Error("Project ID is required");
  }
  if (!data.title || data.title.trim().length < 3) {
    throw new Error("Task title must be at least 3 characters long");
  }
  await checkProjectAccess(data.projectId, userId);
  const validStatuses = ["Todo", "In Progress", "Done"];
  if (data.status && !validStatuses.includes(data.status)) {
    throw new Error("Invalid status");
  }
  const validPriorities = ["Low", "Medium", "High"];
  if (data.priority && !validPriorities.includes(data.priority)) {
    throw new Error("Invalid priority");
  }
  const taskData = {
    projectId: data.projectId,
    title: data.title.trim(),
    description: data.description?.trim() || null,
    status: data.status || "Todo",
    priority: data.priority || "Medium",
    assigneeId: data.assigneeId || null,
    dueDate: data.dueDate ? new Date(data.dueDate) : null
  };
  const task = await create$1(taskData);
  if (data.labelIds && Array.isArray(data.labelIds)) {
    for (const labelId of data.labelIds) {
      await create({
        taskId: task.id,
        labelId
      });
    }
    return await findById(task.id);
  }
  return task;
}
async function getTask(taskId, userId) {
  const task = await findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }
  await checkProjectAccess(task.projectId, userId);
  return task;
}
async function getProjectTasks(projectId, userId, filters = {}) {
  await checkProjectAccess(projectId, userId);
  return await findByProject(projectId, filters);
}
async function getTasksByStatus(projectId, userId) {
  await checkProjectAccess(projectId, userId);
  return await getTasksByStatus$1(projectId);
}
async function getUserTasks(userId) {
  return await findByAssignee(userId);
}
async function updateTask(taskId, userId, data) {
  const task = await findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }
  await checkProjectAccess(task.projectId, userId);
  if (data.title && data.title.trim().length < 3) {
    throw new Error("Task title must be at least 3 characters long");
  }
  if (data.status) {
    const validStatuses = ["Todo", "In Progress", "Done"];
    if (!validStatuses.includes(data.status)) {
      throw new Error("Invalid status");
    }
  }
  if (data.priority) {
    const validPriorities = ["Low", "Medium", "High"];
    if (!validPriorities.includes(data.priority)) {
      throw new Error("Invalid priority");
    }
  }
  const updateData = {};
  if (data.title) updateData.title = data.title.trim();
  if (data.description !== void 0)
    updateData.description = data.description?.trim() || null;
  if (data.status) updateData.status = data.status;
  if (data.priority) updateData.priority = data.priority;
  if (data.assigneeId !== void 0) updateData.assigneeId = data.assigneeId || null;
  if (data.dueDate !== void 0)
    updateData.dueDate = data.dueDate ? new Date(data.dueDate) : null;
  const updatedTask = await update(taskId, updateData);
  if (data.labelIds !== void 0 && Array.isArray(data.labelIds)) {
    await removeAllByTask(taskId);
    for (const labelId of data.labelIds) {
      await create({
        taskId,
        labelId
      });
    }
    return await findById(taskId);
  }
  return updatedTask;
}
async function deleteTask(taskId, userId) {
  const task = await findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }
  await checkProjectAccess(task.projectId, userId);
  return await remove(taskId);
}
export {
  getUserTasks as a,
  getTasksByStatus as b,
  createTask as c,
  getTask as d,
  deleteTask as e,
  getProjectTasks as g,
  updateTask as u
};
