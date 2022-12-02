import { Application } from 'oak';
import { GraphQLService } from './middlewares.ts';
import {oakCors} from 'cors';

const app = new Application();

const _PORT = Deno.env.get("PORT");
const PORT = parseInt(_PORT as string);
const port = isNaN(PORT) ? 8080: PORT;

app.use(oakCors());
app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log(`Server listening on ${port}/graphql`);
await app.listen({ port });
