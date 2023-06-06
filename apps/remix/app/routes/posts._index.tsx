import type { V2_MetaFunction} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { setAction } from "~/lib/setAction";
import { handleActions } from "~/lib/handleActions";
import { db } from "~/utils/db.server";
import type { Prisma } from "@prisma/client";

const CREATE_POST = 'posts/create_post'

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Remix - Posts" },
  ];
};

export async function loader () {
  return json({
    posts: await db.post.findMany()
  })
}

async function createPost(data: Prisma.PostCreateInput) {
  return await db.post.create({
    data
  })
}

export const action = handleActions({
  [CREATE_POST]: createPost
})

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
   <main>
    <Link to="/">Home</Link>
    <h1>Posts</h1>

    <h2>New Post</h2>
    <Form method="post">
      <input type="text" name="title" />
      <input type="textarea" name="body" />
      <button type="submit" {...setAction(CREATE_POST)}>Submit</button>
    </Form>

    <h2>All Posts</h2>
    <ul>
      {data.posts.map((post) => {
        return (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        )
      })}
    </ul>
   </main>
  );
}
