import { serve } from 'https://deno.land/std/http/server.ts';

serve((_req) => new Response("Hello Deno"), { port: 8000 });

console.log('the server started on http://localhost:8000');


// > deno run --allow-net main.ts