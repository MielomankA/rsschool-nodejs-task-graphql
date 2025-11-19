import type { PrismaClient } from '@prisma/client';
import type { GQLContext } from './types/gql-context.js';

export const createContext = (prisma: PrismaClient): GQLContext => {
  return { prisma };
};
