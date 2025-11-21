import { GraphQLBoolean, GraphQLInt, GraphQLInputObjectType } from 'graphql';
import { MemberTypeIdEnum } from '../types/member-type-id-enum.js';

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdEnum },
  },
});
