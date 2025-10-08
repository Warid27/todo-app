import { PrismaClient } from '@prisma/client';

let prisma;

// Use Turso in production, local SQLite in development
if (process.env.TURSO_AUTH_TOKEN) {
  const { PrismaLibSQL } = await import('@prisma/adapter-libsql');
  const { createClient } = await import('@libsql/client');
  
  const libsql = createClient({
    url: process.env.DATABASE_URL || 'file:./dev.db',
    authToken: process.env.TURSO_AUTH_TOKEN
  });
  
  const adapter = new PrismaLibSQL(libsql);
  prisma = new PrismaClient({ adapter });
} else {
  prisma = new PrismaClient();
}

export { prisma };