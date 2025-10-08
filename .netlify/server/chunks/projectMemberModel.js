import { p as prisma } from "./prisma.js";
async function create$1(data) {
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
async function findById$1(id) {
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
async function findByUser(userId) {
  return await prisma.project.findMany({
    where: {
      OR: [
        { ownerId: userId },
        {
          members: {
            some: {
              userId
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
      updatedAt: "desc"
    }
  });
}
async function update(id, data) {
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
async function remove$1(id) {
  return await prisma.project.delete({
    where: { id }
  });
}
async function getStats(id) {
  const tasks = await prisma.task.groupBy({
    by: ["status"],
    where: { projectId: id },
    _count: true
  });
  return {
    total: tasks.reduce((sum, item) => sum + item._count, 0),
    todo: tasks.find((t) => t.status === "Todo")?._count || 0,
    inProgress: tasks.find((t) => t.status === "In Progress")?._count || 0,
    done: tasks.find((t) => t.status === "Done")?._count || 0
  };
}
async function create(data) {
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
async function findById(id) {
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
async function findByProjectAndUser(projectId, userId) {
  return await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId
      }
    }
  });
}
async function updateRole(id, role) {
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
async function remove(id) {
  return await prisma.projectMember.delete({
    where: { id }
  });
}
async function isMember(projectId, userId) {
  const member = await findByProjectAndUser(projectId, userId);
  return member !== null;
}
export {
  findById$1 as a,
  findByUser as b,
  create$1 as c,
  update as d,
  remove$1 as e,
  findById as f,
  findByProjectAndUser as g,
  create as h,
  isMember as i,
  getStats as j,
  remove as r,
  updateRole as u
};
