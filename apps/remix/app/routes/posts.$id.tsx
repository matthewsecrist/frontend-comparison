import type { LoaderArgs, V2_MetaFunction} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Remix - Posts" },
  ];
};

export async function loader ({ params }: LoaderArgs) {
  const post = await db.post.findUnique({
    where: { id: params.id }
  })

  if (!post) {
    throw new Error('Post not found')
  }

  return json({ post })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
   <main>
    <Link to="/posts">Posts</Link>
    <h1>{data.post.title}</h1>
    <Form method='delete' action={`/api/posts/${data.post.id}`}>
      <button type="submit">Delete</button>
    </Form>
    <p>{data.post.body}</p>
   </main>
  );
}
