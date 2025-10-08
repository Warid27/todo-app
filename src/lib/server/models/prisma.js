import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.TURSO_AUTH_TOKEN) {
  const { PrismaLibSQL } = await import("@prisma/adapter-libsql");
  
  // ✅ CORRECT - Pass Config directly to adapter
  const adapter = new PrismaLibSQL({
    url: process.env.DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  
  prisma = new PrismaClient({ adapter });
} else {
  prisma = new PrismaClient();
}

export { prisma };