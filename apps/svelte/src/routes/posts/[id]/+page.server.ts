import prisma from "$lib/prisma";
import type { Post } from "@prisma/client";
import type { PageServerLoad } from "../$types";

import { error } from "@sveltejs/kit";

type OutputType = {
  post: Post
}

export const load: PageServerLoad<OutputType> = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: params.id
    }
  })

  if (!post) {
    throw error(404, 'not found')
  }

  return {
    post
  }
}
