import DataLoader from 'dataloader';
import { PrismaClient, User } from '@prisma/client';

export const createUserLoader = (prisma: PrismaClient) => {
  return new DataLoader<string, User | null>(async (userIds) => {
    const users = await prisma.user.findMany({
      where: { id: { in: userIds as string[] } },
    });

    const usersById: Record<string, User> = {};
    users.forEach((user) => {
      usersById[user.id] = user;
    });

    return userIds.map((id) => usersById[id] || null);
  });
};
