import prisma from "$lib/prisma";
import { error, redirect } from "@sveltejs/kit";

export const load = async ({ params }) => {
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

export const actions = {
  deletePost: async ({ params }) => {
    await prisma.post.delete({
      where: { id: params.id }
    })

    throw redirect(308, '/posts')
  }
}
