import type { PrismaClient, MemberType, Post, Profile, User } from '@prisma/client';
import DataLoader from 'dataloader';

export interface GQLContext {
  prisma: PrismaClient;
  loaders: {
    userLoader: DataLoader<
      string,
      {
        id: string;
        name: string;
        balance: number;
      } | null
    >;
    postsByAuthorIdLoader: DataLoader<string, Post[]>;
    profileByUserIdLoader: DataLoader<string, Profile | null>;
    memberTypeLoader: DataLoader<string, MemberType | null>;
    userSubscribedToLoader: DataLoader<string, User[]>;
    subscribedToUserLoader: DataLoader<string, User[]>;
  };
}
