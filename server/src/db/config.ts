import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log("Database connection successful");
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
}

export { prisma };
