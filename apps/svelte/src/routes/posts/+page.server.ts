import type { Post } from "@prisma/client";
import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";
import { fail, type Actions } from "@sveltejs/kit";

type OutputType = {
  posts: Post[]
}

export const load: PageServerLoad<OutputType> = async () => {
  const posts: Post[] = await prisma.post.findMany()

  return {
    posts
  }
}

export const actions: Actions = {
  createPost: async ({ request }) => {
    const data = await request.formData();

    const title = data.get('title')
    if (!title || typeof title !== 'string') {
      return fail(400, { title, missing: true });
    }

    const body = data.get('body')
    if (!body || typeof body !== 'string') {
      return fail(400, { body, missing: true })
    }

    const post = await prisma.post.create({
      data: {
        title,
        body
      }
    })

    return { post }
  }
}
