import bcrypt from 'bcrypt';
import * as UserModel from '../models/userModel.js';

const SALT_ROUNDS = 10;

/**
 * Register a new user
 * @param {string} username - Username
 * @param {string} password - Plain text password
 * @returns {Promise<Object>} Created user (without password)
 * @throws {Error} If validation fails or user exists
 */
export async function register(username, password) {
	// Validation
	if (!username || username.trim().length < 3) {
		throw new Error('Username must be at least 3 characters long');
	}

	if (!password || password.length < 6) {
		throw new Error('Password must be at least 6 characters long');
	}

	// Check if user already exists
	const existingUser = await UserModel.findByUsername(username);
	if (existingUser) {
		throw new Error('Username already exists');
	}

	// Hash password
	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

	// Create user
	const user = await UserModel.create({
		username: username.trim(),
		password: hashedPassword
	});

	return user;
}

/**
 * Login a user
 * @param {string} username - Username
 * @param {string} password - Plain text password
 * @returns {Promise<Object>} User object (without password)
 * @throws {Error} If credentials are invalid
 */
export async function login(username, password) {
	// Find user
	const user = await UserModel.findByUsername(username);
	if (!user) {
		throw new Error('Invalid username or password');
	}

	// Verify password
	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) {
		throw new Error('Invalid username or password');
	}

	// Return user without password
	const { password: _, ...userWithoutPassword } = user;
	return userWithoutPassword;
}

/**
 * Get user by ID (for session validation)
 * @param {string} userId - User ID
 * @returns {Promise<Object|null>} User object or null
 */
export async function getUserById(userId) {
	return await UserModel.findById(userId);
}
