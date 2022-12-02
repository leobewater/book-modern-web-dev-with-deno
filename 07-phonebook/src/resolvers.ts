import { GQLError } from 'oak_graphql';

export const resolvers = {
  Query: {
    hello: (parent: any, { name }: any, context: any, info: any) => {
      if (!name) throw new GQLError('Name not provided');
      return `Hello ${name}`;
    },
  },
};
