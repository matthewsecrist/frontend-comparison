import prisma from "$lib/prisma";
import type { Post } from "@prisma/client";
import type { PageServerLoad } from "./$types";

import { error, redirect, type Actions } from "@sveltejs/kit";

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

export const actions: Actions = {
  deletePost: async ({ params }) => {
    await prisma.post.delete({
      where: { id: params.id }
    })

    return redirect(308, '/posts')
  }
}
