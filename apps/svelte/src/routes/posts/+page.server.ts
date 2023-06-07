import type { Post } from "@prisma/client";
import prisma from "../../lib/prisma";
import type { PageServerLoad } from "./$types";

type OutputType = {
  posts: Post[]
}

export const load: PageServerLoad<OutputType> = async () => {
  const posts: Post[] = await prisma.post.findMany()

  return {
    posts
  }
}
