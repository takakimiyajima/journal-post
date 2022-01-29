import prisma from '@/lib/prisma'
import { PostMapper } from './postEntity'

/**
 * Post-related
 */
export const fetchPosts = async () => {
  const posts = await prisma.post.findMany(
    {
      include: { commentsOnPost: true },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    }
  )

  return PostMapper.getPostsEntity(posts)
}

export const findPost = async (id: string | number) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { commentsOnPost: true },
  })

  return post ? PostMapper.getPostEntity(post) : null
}
