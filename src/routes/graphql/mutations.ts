import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from "graphql";
import { User } from "./types/user.js";
import { Profile } from "./types/profile.js";
import { Post } from "./types/post.js";
import { ChangePostInput } from "./inputs/change-post-input.js";
import { ChangeProfileInput } from "./inputs/change-profile-input.js";
import { ChangeUserInput } from "./inputs/change-user-input.js";
import { CreateUserInput } from "./inputs/create-user-input.js";
import { CreateProfileInput } from "./inputs/create-profile-input.js";
import { CreatePostInput } from "./inputs/create-post-input.js";

export const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: () => ({
        createUser: {
            type: new GraphQLNonNull(User),
            args: { dto: { type: new GraphQLNonNull(CreateUserInput) } },
        },
        createProfile: {
            type: new GraphQLNonNull(Profile),
            args: { dto: { type: new GraphQLNonNull(CreateProfileInput) } },
        },
        createPost: {
            type: new GraphQLNonNull(Post),
            args: { dto: { type: new GraphQLNonNull(CreatePostInput) } },
        },
        changePost: {
            type: new GraphQLNonNull(Post),
            args: { id: { type: GraphQLInt }, dto: { type: new GraphQLNonNull(ChangePostInput) } },
        },
        changeProfile: {
            type: new GraphQLNonNull(Profile),
            args: { id: { type: GraphQLInt }, dto: { type: new GraphQLNonNull(ChangeProfileInput) } },
        },
        changeUser: {
            type: new GraphQLNonNull(User),
            args: { id: { type: GraphQLInt }, dto: { type: new GraphQLNonNull(ChangeUserInput) } },
        },
        deleteUser: {
            type: new GraphQLNonNull(GraphQLString),
            args: { id: { type: GraphQLInt } },
        },
        deletePost: {
            type: new GraphQLNonNull(GraphQLString),
            args: { id: { type: GraphQLInt } },
        },
        deleteProfile: {
            type: new GraphQLNonNull(GraphQLString),
            args: { id: { type: GraphQLInt } },
        },
        subscribeTo: {
            type: new GraphQLNonNull(GraphQLString),
            args: { userId: { type: GraphQLInt }, authorId: { type: GraphQLInt } },
        },
        unsubscribeFrom: {
            type: new GraphQLNonNull(GraphQLString),
            args: { userId: { type: GraphQLInt }, authorId: { type: GraphQLInt } },
        },
    }),
});
