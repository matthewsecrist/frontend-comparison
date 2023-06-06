import { redirect } from "next/navigation"
import prisma from "../../utls/prisma"
import Link from "next/link"

export default async function Page({ params }: { params: { id: string }}) {
  const post = await prisma.post.findUnique({
    where: {
      id: params.id
    }
  })

  if (!post) {
    return redirect('/posts')
  }

  async function deletePost() {
    'use server'
    await prisma.post.delete({ where: { id: params.id }})

    return redirect('/posts')
  }

  return (
    <main>
      <Link href="/posts">Posts</Link>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <form action={deletePost}>
        <button type="submit">Delete</button>
      </form>
    </main>
  )
}
