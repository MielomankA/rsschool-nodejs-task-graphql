import { PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';

export const createSubscribedToUserLoader = (prisma: PrismaClient) => {
  return new DataLoader<string, User[]>(async (authorIds) => {
    const relations = await prisma.subscribersOnAuthors.findMany({
      where: { authorId: { in: authorIds as string[] } },
      include: { subscriber: true },
    });

    const map: Record<string, User[]> = {};
    authorIds.forEach((id) => {
      map[id] = [];
    });
    relations.forEach((r) => {
      map[r.authorId].push(r.subscriber);
    });

    return authorIds.map((id) => map[id]);
  });
};
