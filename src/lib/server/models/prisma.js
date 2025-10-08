import { PrismaClient } from '@prisma/client';

/**
 * Global Prisma client instance for database operations
 */
export const prisma = new PrismaClient();
