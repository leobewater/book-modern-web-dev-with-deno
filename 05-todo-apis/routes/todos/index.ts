export type Todo = {
  id: number;
  title: string;
};

export const todos: Todo[] = [
  { id: 1, title: "todo1"},
  { id: 2, title: "todo2"},
];

export const GET = (req: Request) => {
  const url = new URL(req.url);
  return Response.json(todos.map((item) => ({ ...item, url: `${url.origin}/todos/${item.id}` })));
};

export const POST = async (req: Request) => {
  const data = await req.formData();
  const title = data.get("title");
  if (typeof title !== "string" || title.length === 0) {
    return Response.json({ error: { message: "invalid title", code: "invalidTitle" } }, { status: 400 });
  }
  const item: User = { id: todos.length + 1, title };
  todos.push(item);
  return Response.json(item);
};
