import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create Prisma client with build-time safety
function createPrismaClient() {
  // During build time, DATABASE_URL might not be set
  // Return a mock client that will work for type checking
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL not found. Creating placeholder Prisma client for build.');
    // Return a basic PrismaClient without datasource config for build time
    return new PrismaClient();
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

// Graceful shutdown
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
} else {
  // In production, disconnect on process termination
  process.on('beforeExit', async () => {
    await db.$disconnect();
  });
}

