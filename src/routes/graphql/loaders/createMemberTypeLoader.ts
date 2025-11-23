import { PrismaClient, MemberType } from '@prisma/client';
import DataLoader from 'dataloader';

export const createMemberTypeLoader = (prisma: PrismaClient) => {
  return new DataLoader<string, MemberType | null>(async (memberTypeIds) => {
    const memberTypes = await prisma.memberType.findMany({
      where: { id: { in: memberTypeIds as string[] } },
    });

    const memberTypesById: Record<string, MemberType> = {};
    memberTypes.forEach((mt) => {
      memberTypesById[mt.id] = mt;
    });

    return memberTypeIds.map((id) => memberTypesById[id] || null);
  });
};
