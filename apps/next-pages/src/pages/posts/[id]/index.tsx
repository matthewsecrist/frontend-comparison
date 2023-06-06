import prisma from "@/lib/prisma"
import { Post } from "@prisma/client"
import { GetServerSideProps, GetStaticProps } from "next"
import Link from "next/link"

interface PageProps {
  post: Post
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ params }) => {
  if (!params?.id || typeof params.id !== 'string') {
    throw new Error('Not found')
  }

  const post = await prisma.post.findUnique({
    where: { id: params.id }
  })

  if (!post) {
    throw new Error('not found')
  }

  return {
    props: {
      post
    }
  }
}

export default function Page({
  post
}: PageProps) {
  return (
    <main>
      <Link href="/posts">Posts</Link>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </main>
  )
}
