import { GraphQLInputObjectType, GraphQLNonNull } from "graphql";
import { GraphQLString } from "graphql";
import { GraphQLInt } from "graphql";

export const CreatePostInput = new GraphQLInputObjectType({
    name: 'CreatePostInput',
    fields: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLInt) },
    },
});
