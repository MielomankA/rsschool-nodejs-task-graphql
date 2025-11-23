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
import { UserModel } from './models.js';

export const User = new GraphQLObjectType<UserModel, GQLContext>({
  name: 'User',
  fields: (): GraphQLFieldConfigMap<UserModel, GQLContext> => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: Profile,
      resolve: (user, _, ctx: GQLContext) => {
        return ctx.loaders.profileByUserIdLoader.load(user.id);
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
      resolve: (user, _, ctx: GQLContext) => {
        return ctx.loaders.postsByAuthorIdLoader.load(user.id);
      },
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      resolve: async (user: UserModel, _, ctx: GQLContext) => {
        return ctx.loaders.userSubscribedToLoader.load(user.id);
      },
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      resolve: async (user, _, ctx: GQLContext) => {
        return ctx.loaders.subscribedToUserLoader.load(user.id);
      },
    },
  }),
});
