import { p as prisma } from "./prisma.js";
async function create(data) {
  return await prisma.label.create({
    data
  });
}
async function findAll() {
  return await prisma.label.findMany({
    orderBy: {
      name: "asc"
    }
  });
}
async function findById(id) {
  return await prisma.label.findUnique({
    where: { id }
  });
}
async function findByName(name) {
  return await prisma.label.findUnique({
    where: { name }
  });
}
async function update(id, data) {
  return await prisma.label.update({
    where: { id },
    data
  });
}
async function remove(id) {
  return await prisma.label.delete({
    where: { id }
  });
}
async function createLabel(data) {
  if (!data.name || data.name.trim().length < 2) {
    throw new Error("Label name must be at least 2 characters long");
  }
  if (!data.color || !/^#[0-9A-F]{6}$/i.test(data.color)) {
    throw new Error("Invalid color format. Use hex format like #FF5733");
  }
  const existing = await findByName(data.name.trim());
  if (existing) {
    throw new Error("A label with this name already exists");
  }
  return await create({
    name: data.name.trim(),
    color: data.color.toUpperCase()
  });
}
async function getAllLabels() {
  return await findAll();
}
async function getLabel(labelId) {
  const label = await findById(labelId);
  if (!label) {
    throw new Error("Label not found");
  }
  return label;
}
async function updateLabel(labelId, data) {
  const label = await findById(labelId);
  if (!label) {
    throw new Error("Label not found");
  }
  if (data.name) {
    if (data.name.trim().length < 2) {
      throw new Error("Label name must be at least 2 characters long");
    }
    const existing = await findByName(data.name.trim());
    if (existing && existing.id !== labelId) {
      throw new Error("A label with this name already exists");
    }
  }
  if (data.color && !/^#[0-9A-F]{6}$/i.test(data.color)) {
    throw new Error("Invalid color format. Use hex format like #FF5733");
  }
  const updateData = {};
  if (data.name) updateData.name = data.name.trim();
  if (data.color) updateData.color = data.color.toUpperCase();
  return await update(labelId, updateData);
}
async function deleteLabel(labelId) {
  const label = await findById(labelId);
  if (!label) {
    throw new Error("Label not found");
  }
  return await remove(labelId);
}
export {
  getLabel as a,
  createLabel as c,
  deleteLabel as d,
  getAllLabels as g,
  updateLabel as u
};
