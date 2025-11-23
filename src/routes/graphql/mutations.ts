import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { User } from './types/user.js';
import { Profile } from './types/profile.js';
import { Post } from './types/post.js';
import { ChangePostInput } from './inputs/change-post-input.js';
import { ChangeProfileInput } from './inputs/change-profile-input.js';
import { ChangeUserInput } from './inputs/change-user-input.js';
import { CreateUserInput } from './inputs/create-user-input.js';
import { CreateProfileInput } from './inputs/create-profile-input.js';
import { CreatePostInput } from './inputs/create-post-input.js';
import { GQLContext } from './types/gql-context.js';
import { PostModel, ProfileModel, UserModel } from './types/models.js';
import { UUIDType } from './types/uuid.js';

type CreateUserInputDto = Pick<UserModel, 'name' | 'balance'>;
type CreateProfileInputDto = Omit<ProfileModel, 'id'> & { userId: string };
type PostInputModelDto = Omit<PostModel, 'id'> & { authorId: string };
type ChangePostInputDto = Omit<PostInputModelDto, 'authorId'>;
type ChangeProfileInputDto = Omit<CreateProfileInputDto, 'userId'>;
type ChangeUserInputDto = Pick<UserModel, 'name' | 'balance'>;

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    createUser: {
      type: new GraphQLNonNull(User),
      args: { dto: { type: new GraphQLNonNull(CreateUserInput) } },
      resolve: (_, { dto }: { dto: CreateUserInputDto }, ctx: GQLContext) => {
        return ctx.prisma.user.create({ data: dto });
      },
    },
    createProfile: {
      type: new GraphQLNonNull(Profile),
      args: { dto: { type: new GraphQLNonNull(CreateProfileInput) } },
      resolve: (_, { dto }: { dto: CreateProfileInputDto }, ctx: GQLContext) => {
        return ctx.prisma.profile.create({ data: dto });
      },
    },
    createPost: {
      type: new GraphQLNonNull(Post),
      args: { dto: { type: new GraphQLNonNull(CreatePostInput) } },
      resolve: (_, { dto }: { dto: PostInputModelDto }, ctx: GQLContext) => {
        return ctx.prisma.post.create({ data: dto });
      },
    },
    changePost: {
      type: new GraphQLNonNull(Post),
      args: {
        id: { type: UUIDType },
        dto: { type: new GraphQLNonNull(ChangePostInput) },
      },
      resolve: (
        _,
        { id, dto }: { id: string; dto: ChangePostInputDto },
        ctx: GQLContext,
      ) => {
        return ctx.prisma.post.update({
          where: { id },
          data: { title: dto.title, content: dto.content },
        });
      },
    },
    changeProfile: {
      type: new GraphQLNonNull(Profile),
      args: {
        id: { type: UUIDType },
        dto: { type: new GraphQLNonNull(ChangeProfileInput) },
      },
      resolve: (
        _,
        { id, dto }: { id: string; dto: ChangeProfileInputDto },
        ctx: GQLContext,
      ) => {
        return ctx.prisma.profile.update({ where: { id }, data: dto });
      },
    },
    changeUser: {
      type: new GraphQLNonNull(User),
      args: {
        id: { type: UUIDType },
        dto: { type: new GraphQLNonNull(ChangeUserInput) },
      },
      resolve: (
        _,
        { id, dto }: { id: string; dto: ChangeUserInputDto },
        ctx: GQLContext,
      ) => {
        return ctx.prisma.user.update({ where: { id }, data: dto });
      },
    },
    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
      args: { id: { type: UUIDType } },
      resolve: async (_, { id }: { id: string }, ctx: GQLContext) => {
        const deleted = await ctx.prisma.user.delete({ where: { id } });

        return deleted.id;
      },
    },
    deletePost: {
      type: new GraphQLNonNull(GraphQLString),
      args: { id: { type: UUIDType } },
      resolve: async (_, { id }: { id: string }, ctx: GQLContext) => {
        const deleted = await ctx.prisma.post.delete({
          where: {
            id,
          },
        });

        return deleted.id;
      },
    },
    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
      args: { id: { type: UUIDType } },
      resolve: async (_, { id }: { id: string }, ctx: GQLContext) => {
        const deleted = await ctx.prisma.profile.delete({ where: { id } });

        return deleted.id;
      },
    },
    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (
        _,
        { userId, authorId }: { userId: string; authorId: string },
        ctx: GQLContext,
      ) => {
        await ctx.prisma.subscribersOnAuthors.create({
          data: {
            subscriberId: userId,
            authorId: authorId,
          },
        });

        return authorId;
      },
    },
    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
      resolve: async (
        _,
        { userId, authorId }: { userId: string; authorId: string },
        ctx: GQLContext,
      ) => {
        await ctx.prisma.subscribersOnAuthors.deleteMany({
          where: {
            subscriberId: userId,
            authorId: authorId,
          },
        });

        return true;
      },
    },
  }),
});
