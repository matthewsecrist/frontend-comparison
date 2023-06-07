import prisma from "$lib/prisma";
import { fail } from "@sveltejs/kit";

export const load = async () => {
  return {
    posts: await prisma.post.findMany()
  }
}

export const actions = {
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

    return await prisma.post.create({
      data: {
        title,
        body
      }
    })
  }
}
