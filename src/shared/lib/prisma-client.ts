import { PrismaClient } from "@prisma/client";

export const prisma: PrismaClient = new PrismaClient();

const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log("🚀 ~ database connected.");
  } catch (error) {
    console.log(
      "🚀 ~ file: prisma-client.ts:15 ~ connectDatabase ~ error:",
      (error as Record<string, string>)?.stack,
    );
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log("🚀 ~ database disconnected.");
  }
};

export default connectDatabase;
