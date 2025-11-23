import { User, PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export const createUserSubscribedToLoader = (prisma: PrismaClient) => {
  return new DataLoader<string, User[]>(async (subscriberIds) => {
    const relations = await prisma.subscribersOnAuthors.findMany({
      where: { subscriberId: { in: subscriberIds as string[] } },
      include: { author: true },
    });

    const map: Record<string, User[]> = {};
    subscriberIds.forEach((id) => {
      map[id] = [];
    });
    relations.forEach((r) => {
      map[r.subscriberId].push(r.author);
    });

    return subscriberIds.map((id) => map[id]);
  });
};
