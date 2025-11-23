import { PrismaClient, Post } from '@prisma/client';
import DataLoader from 'dataloader';

export const createPostsByAuthorIdLoader = (prisma: PrismaClient) => {
  return new DataLoader<string, Post[]>(async (authorIds) => {
    const posts = await prisma.post.findMany({
      where: { authorId: { in: authorIds as string[] } },
    });

    const postsByAuthorId: Record<string, Post[]> = {};
    authorIds.forEach((id) => {
      postsByAuthorId[id] = [];
    });
    posts.forEach((post) => {
      if (!postsByAuthorId[post.authorId]) postsByAuthorId[post.authorId] = [];
      postsByAuthorId[post.authorId].push(post);
    });

    return authorIds.map((id) => postsByAuthorId[id]);
  });
};
