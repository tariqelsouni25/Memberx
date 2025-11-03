import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Optimize for serverless/edge environments
  // @ts-expect-error - Internal Prisma option for serverless optimization
  __internal: {
    engine: {
      connectionTimeout: 30000, // 30 seconds
    },
  },
});

// Graceful shutdown
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
} else {
  // In production, disconnect on process termination
  process.on('beforeExit', async () => {
    await db.$disconnect();
  });
}

