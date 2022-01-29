import type { NextApiHandler } from 'next'
import prisma from '@/lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  try {
    const newPost = await prisma.commentsOnPost.create({
      data: {
        postId: req.body.postId,
        comment: req.body.comment,
      },
    })
  
    return res.json({
      ok: true,
      newPost
    })

  } catch (error) {
    res.json({ ok: false, error })
  }
}

export default handler
