// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        body: req.body.body
      }
    })

    return res.redirect(`/posts/${post.id}`)
  }

  return res.status(405).send(null)
}
