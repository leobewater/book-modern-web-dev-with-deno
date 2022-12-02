import {
  Application,
  Router,
  RouterContext,
} from 'https://deno.land/x/oak/mod.ts';
import {
  applyGraphQL,
  gql,
  GQLError,
} from 'https://deno.land/x/oak_graphql/mod.ts';

const app = new Application();

const types = gql`
  type Query {
    hello(name: String): String
  }
`;

const resolvers = {
  Query: {
    hello: (parent: any, { name }: any, context: any, info: any) => {
      if (!name) throw new GQLError('Name not provided');
      return `Hello ${name}`;
    },
  },
};

const GraphQLService = await applyGraphQL<Router>({
    Router, // same as Router:Router,
    typeDefs: types,
    resolvers: resolvers,
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());
console.log("Server listening on http://localhost:8080/graphql");
await app.listen({port:8080});


// > deno run --allow-net oak_graphql_server.ts

/*
Graphql query

# Write your query or mutation here
query{
  hello(name: "mm")
}
*/