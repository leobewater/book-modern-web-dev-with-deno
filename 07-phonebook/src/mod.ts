import { Application } from 'oak';
import { GraphQLService } from './middlewares.ts';

const app = new Application();

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());
console.log('Server listening on https://localhost8080/graphql');
await app.listen({ port: 8080 });
