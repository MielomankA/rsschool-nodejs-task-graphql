import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType } from './types/member-type.js';
import { Post } from './types/post.js';
import { Profile } from './types/profile.js';
import { User } from './types/user.js';
import { GQLContext } from './types/gql-context.js';
import { MemberTypeIdEnum } from './types/member-type-id-enum.js';
import { UUIDType } from './types/uuid.js';

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
      resolve: async (_, __, ctx: GQLContext) => {
        return ctx.prisma.memberType.findMany();
      },
    },
    memberType: {
      type: MemberType,
      args: { id: { type: MemberTypeIdEnum } },
      resolve: async (_, { id }: { id: 'BASIC' | 'BUSINESS' }, ctx: GQLContext) => {
        console.log('Resolver received id:', id);
        return ctx.prisma.memberType.findUnique({ where: { id } });
      },
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      resolve: async (_, __, ctx: GQLContext) => {
        return ctx.prisma.user.findMany();
      },
    },
    user: {
      type: User,
      args: { id: { type: UUIDType } },
      resolve: async (_, { id }: { id: string }, ctx: GQLContext) => {
        return ctx.prisma.user.findUnique({ where: { id } });
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
      resolve: async (_, __, ctx: GQLContext) => {
        return ctx.prisma.post.findMany();
      },
    },
    post: {
      type: Post,
      args: { id: { type: UUIDType } },
      resolve: async (_, { id }: { id: string }, ctx: GQLContext) => {
        return ctx.prisma.post.findUnique({ where: { id } });
      },
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Profile))),
      resolve: async (_, __, ctx: GQLContext) => {
        return ctx.prisma.profile.findMany();
      },
    },
    profile: {
      type: Profile,
      args: { id: { type: UUIDType } },
      resolve: async (_, { id }: { id: string }, ctx: GQLContext) => {
        return ctx.prisma.profile.findUnique({ where: { id } });
      },
    },
  }),
});
