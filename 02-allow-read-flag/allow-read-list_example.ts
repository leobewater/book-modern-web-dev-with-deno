const argsContent = await Deno.readTextFile("./args.ts")
console.log(argsContent);

/* Run Terminal

# Only ‘args.ts’ file is allowed to be read
> deno run --allow-read=args.ts allow-read-list_example.ts

# Error
# Only ‘args1.ts’, ‘args2.ts’ files are allowed to be read
> deno run --allow-read=args1.ts,args2.ts allow-read-list_example.ts
*/