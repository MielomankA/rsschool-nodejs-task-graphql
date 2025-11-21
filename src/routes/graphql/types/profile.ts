import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType } from './member-type.js';
import { UUIDType } from '../types/uuid.js';
import { GQLContext } from '../types/gql-context.js';
import { ProfileModel } from './models.js';

export const Profile = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: (profile: ProfileModel, _, ctx: GQLContext) => {
        return ctx.prisma.memberType.findUnique({ where: { id: profile.memberTypeId } });
      },
    },
  }),
});
