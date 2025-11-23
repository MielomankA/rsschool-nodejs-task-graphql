import { PrismaClient, Profile } from '@prisma/client';
import DataLoader from 'dataloader';

export const createProfileByUserIdLoader = (prisma: PrismaClient) => {
  return new DataLoader<string, Profile | null>(async (userIds) => {
    const profiles = await prisma.profile.findMany({
      where: { userId: { in: userIds as string[] } },
    });

    const profilesByUserId: Record<string, Profile> = {};
    profiles.forEach((profile) => {
      profilesByUserId[profile.userId] = profile;
    });

    return userIds.map((id) => profilesByUserId[id] || null);
  });
};
