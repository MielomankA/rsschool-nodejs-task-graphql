import type { PrismaClient } from '@prisma/client';
import type { GQLContext } from './types/gql-context.js';
import { createPostsByAuthorIdLoader } from './loaders/createPostsByAuthorIdLoader.js';
import { createUserLoader } from './loaders/createUserLoader.js';
import { createProfileByUserIdLoader } from './loaders/profileByUserIdLoader.js';
import { createMemberTypeLoader } from './loaders/createMemberTypeLoader.js';
import { createUserSubscribedToLoader } from './loaders/createUserSubscribedToLoader.js';
import { createSubscribedToUserLoader } from './loaders/createSubscribedToUserLoader.js';

export const createContext = (prisma: PrismaClient): GQLContext => {
  return {
    prisma,
    loaders: {
      userLoader: createUserLoader(prisma),
      postsByAuthorIdLoader: createPostsByAuthorIdLoader(prisma),
      profileByUserIdLoader: createProfileByUserIdLoader(prisma),
      memberTypeLoader: createMemberTypeLoader(prisma),
      userSubscribedToLoader: createUserSubscribedToLoader(prisma),
      subscribedToUserLoader: createSubscribedToUserLoader(prisma),
    },
  };
};
