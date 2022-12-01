// permission_list.ts
fetch("https://deno.land");
fetch("https://github.com");
fetch("https://google.com");

/* Run in terminal

# All domains are allowed to access the network
> deno run --allow-net permission_list.ts”

# Only ‘deno.land’ and ‘github.com’ domains are allowed network access
> deno run --allow-net=deno.land,github.com permission_list.ts
*/