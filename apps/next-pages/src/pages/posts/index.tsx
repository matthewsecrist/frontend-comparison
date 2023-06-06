import prisma from "@/lib/prisma"
import { Post } from "@prisma/client"
import { GetServerSideProps } from "next"
import Link from "next/link"


export const getServerSideProps: GetServerSideProps<{ posts: Post[] }> = async () => {
  const posts = await prisma.post.findMany()

  return {
    props: {
      posts
    }
  }
}

interface PageProps {
  posts: Post[]
}

export default function Page({
  posts
}: PageProps) {
  return (
    <main>
      <h1>Posts</h1>
      <form action="/api/posts" method="POST">
        <input type="text" name="title" />
        <input type="text" name="body" />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {posts.map((post: Post) => {
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
