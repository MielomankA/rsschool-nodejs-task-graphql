import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';
import { createContext } from './context.js';
import { schema } from './schema.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      console.log('req.body:', req.body);

      const result = await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: createContext(prisma),
      });

      console.log(JSON.stringify(result, null, 2));

      return result;
    },
  });
};

export default plugin;
