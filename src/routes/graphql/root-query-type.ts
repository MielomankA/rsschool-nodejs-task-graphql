import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLInt } from "graphql";
import { MemberType } from "./types/member-type.js";
import { Post } from "./types/post.js";
import { Profile } from "./types/profile.js";
import { User } from "./types/user.js";

export const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        memberTypes: {
            type: new GraphQLNonNull(new GraphQLList(MemberType))
        },
        memberType: {
            type: new GraphQLNonNull(MemberType),
            args: { id: { type: GraphQLInt } },
        },
        users: { type: new GraphQLNonNull(new GraphQLList(User)) },
        user: { type: new GraphQLNonNull(User), args: { id: { type: GraphQLInt } } },
        posts: { type: new GraphQLNonNull(new GraphQLList(Post)) },
        post: { type: new GraphQLNonNull(Post), args: { id: { type: GraphQLInt } } },
        profiles: { type: new GraphQLNonNull(new GraphQLList(Profile)) },
        profile: {
            type: new GraphQLNonNull(Profile),
            args: { id: { type: GraphQLInt } },
        },
    }),
});
