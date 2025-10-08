import { p as prisma } from "./prisma.js";
async function create(data) {
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
async function findByUsername(username) {
  return await prisma.user.findUnique({
    where: { username }
  });
}
async function findById(id) {
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
async function findAll() {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true
    },
    orderBy: {
      username: "asc"
    }
  });
}
export {
  findByUsername as a,
  findById as b,
  create as c,
  findAll as f
};
