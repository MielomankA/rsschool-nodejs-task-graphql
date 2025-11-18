import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLBoolean,
} from 'graphql';

const memberType = new GraphQLObjectType({
    name: 'MemberType',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

const postType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

const profileType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
        memberType: { type: new GraphQLNonNull(memberType) },
    }),
});

const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        balance: { type: new GraphQLNonNull(GraphQLFloat) },
        profile: { type: new GraphQLNonNull(profileType) },
        posts: { type: new GraphQLNonNull(new GraphQLList(postType)) },
        userSubscribedTo: { type: new GraphQLNonNull(new GraphQLList(userType)) },
        subscribedToUser: { type: new GraphQLNonNull(new GraphQLList(userType)) },
    }),
});

export const schema: GraphQLSchema = new GraphQLSchema({
    // query: queryType,
    //mutation: mutationType,
    types: [memberType, postType, profileType, userType],
});
