import { titleCase, assertEquals } from './deps.ts';

console.log(titleCase("hello world"));
assertEquals("hello", "helloz");

// > deno run hello.ts