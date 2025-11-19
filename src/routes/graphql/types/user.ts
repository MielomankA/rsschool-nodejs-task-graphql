import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { Post } from './post.js';
import { Profile } from './profile.js';

export const User = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        balance: { type: new GraphQLNonNull(GraphQLFloat) },
        profile: { type: new GraphQLNonNull(Profile) },
        posts: { type: new GraphQLNonNull(new GraphQLList(Post)) },
        userSubscribedTo: { type: new GraphQLNonNull(new GraphQLList(User)) },
        subscribedToUser: { type: new GraphQLNonNull(new GraphQLList(User)) },
    }),
});
