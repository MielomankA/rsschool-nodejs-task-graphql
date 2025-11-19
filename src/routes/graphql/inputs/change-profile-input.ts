import { GraphQLBoolean, GraphQLInt, GraphQLInputObjectType } from "graphql";

export const ChangeProfileInput = new GraphQLInputObjectType({
    name: 'ChangeProfileInput',
    fields: {
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
        memberTypeId: { type: GraphQLInt },
    },
});
