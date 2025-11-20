import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Post } from './post.js';
import { Profile } from './profile.js';
import { UUIDType } from '../types/uuid.js';
import { GQLContext } from '../types/gql-context.js';
import { GraphQLFieldConfigMap } from 'graphql';

type PostModel = {
  id: string;
  title: string;
  content: string;
};

type UserModel = {
  id: string;
  name: string;
  balance: number;
  profileId?: string;
  posts: PostModel[];
  userSubscribedToIds: string[];
  subscribedToUserIds: string[];
};

export const User = new GraphQLObjectType<UserModel, GQLContext>({
  name: 'User',
  fields: (): GraphQLFieldConfigMap<UserModel, GQLContext> => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: { type: Profile },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
      resolve: (user, _, ctx) => {
        return ctx.prisma.post.findMany({ where: { authorId: user.id } });
      },
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      resolve: async (user, _, ctx) => {
        const relations = await ctx.prisma.subscribersOnAuthors.findMany({
          where: { subscriberId: user.id },
          include: { author: true },
        });

        return relations.map((r) => r.author);
      },
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      resolve: async (user, _, ctx) => {
        const relations = await ctx.prisma.subscribersOnAuthors.findMany({
          where: { authorId: user.id },
          include: { subscriber: true },
        });

        return relations.map((r) => r.subscriber);
      },
    },
  }),
});
