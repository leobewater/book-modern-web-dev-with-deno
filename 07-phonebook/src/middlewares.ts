import { Router } from 'oak';
import { applyGraphQL } from 'oak_graphql';
import { types } from './schema.ts';
import { resolvers } from './resolvers.ts';
import { setContextUser } from './auth.ts';

export const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  context: setContextUser,
  // The setContextUser function uses JSON Web Token (JWT) provided in the 
  // authorization header to retrieve userId and set it in the context so
  // every resolver will have access to it.”
});
