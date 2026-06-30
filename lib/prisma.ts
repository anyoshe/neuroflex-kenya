import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';
import { config } from "dotenv";

config({ path: ".env.local" });

// Create connection pool
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prismaClientSingleton = () => {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is missing in environment variables");
    throw new Error("DATABASE_URL environment variable is required");
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
  });

  const adapter = new PrismaNeon(pool as any); // Type assertion to avoid TS error

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = prismaClientSingleton();
} else {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = prismaClientSingleton();
  }
  prisma = globalForPrisma.prisma;
}

export default prisma;