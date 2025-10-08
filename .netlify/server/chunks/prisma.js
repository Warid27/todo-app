import { PrismaClient } from "@prisma/client";
let prisma;
if (process.env.TURSO_AUTH_TOKEN) {
  const { PrismaLibSQL } = await import("@prisma/adapter-libsql");
  const { createClient } = await import("@libsql/client");
  console.log("ENV: ", process.env.DATABASE_URL);
  const libsql = createClient({
    url: process.env.DATABASE_URL || "file:./dev.db",
    authToken: process.env.TURSO_AUTH_TOKEN
  });
  const adapter = new PrismaLibSQL(libsql);
  prisma = new PrismaClient({ adapter });
} else {
  prisma = new PrismaClient();
}
export {
  prisma as p
};
