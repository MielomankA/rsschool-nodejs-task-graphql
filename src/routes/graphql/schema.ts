import { GraphQLSchema } from 'graphql';
import { RootQueryType } from './root-query-type.js';
import { Mutations } from './mutations.js';

export const schema: GraphQLSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutations,
});
