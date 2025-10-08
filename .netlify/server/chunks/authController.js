import bcrypt from "bcrypt";
import { a as findByUsername, c as create, b as findById } from "./userModel.js";
const SALT_ROUNDS = 10;
async function register(username, password) {
  if (!username || username.trim().length < 3) {
    throw new Error("Username must be at least 3 characters long");
  }
  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
  const existingUser = await findByUsername(username);
  if (existingUser) {
    throw new Error("Username already exists");
  }
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await create({
    username: username.trim(),
    password: hashedPassword
  });
  return user;
}
async function login(username, password) {
  const user = await findByUsername(username);
  if (!user) {
    throw new Error("Invalid username or password");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid username or password");
  }
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
async function getUserById(userId) {
  return await findById(userId);
}
export {
  getUserById as g,
  login as l,
  register as r
};
