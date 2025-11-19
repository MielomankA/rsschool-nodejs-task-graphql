import type { PrismaClient } from '@prisma/client';

export interface GQLContext {
  prisma: PrismaClient;
}
