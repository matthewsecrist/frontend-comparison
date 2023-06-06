import Link from "next/link";
import prisma from "../utls/prisma"
import { redirect } from "next/navigation";

export default async function Page() {
  const posts = await prisma.post.findMany()

  async function addItem(formData: FormData) {
    'use server';

    const title = formData.get('title')
    if (!title || typeof title !== 'string') {
      throw new Error('missing title')
    }

    const body = formData.get('body')
    if (!body || typeof body !== 'string') {
      throw new Error('missing body')
    }

    const post = await prisma.post.create({
      data: {
        title,
        body
      }
    })

    return redirect(`/posts/${post.id}`)
  }

  return (
    <main>
      <h1>Posts</h1>

      <form action={addItem}>
        <input type="text" name="title" />
        <input type="text" name="body" />
        <button type="submit">Add Post</button>
      </form>

      <ul>
        {posts.map(post => {
          return (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
