import { User, Post, CommentsOnPost } from '@prisma/client'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(timezone)
dayjs.extend(utc)

export type PostResponse = Post & {
  commentsOnPost: Array<CommentsOnPost>
}

export type PostEntity = Omit<Post, "createdAt"> & {
  createdAt: string
  comments: Array<string>
}

export class PostMapper {
  /**
   * Get all posts entity for frontend
   * @param posts post date from API
   */
  static getPostsEntity = (
    posts: Array<PostResponse>
  ): Array<PostEntity> => {
    return posts.map((post) => {
      return PostMapper.getPostEntity(post)
    })
  }

  /**
   * Get a post entity for frontend
   * @param post post date from API
   */
  static getPostEntity = (
    post: PostResponse
  ): PostEntity => {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      createdAt: dayjs(post.createdAt).format('MMMM D, YYYY h:mm A'),
      comments: PostMapper.getComments(post.commentsOnPost)
    }
  }

  static getComments = (
    comments: Array<CommentsOnPost>
  ): Array<string> => {
    return comments.map(({ comment }) => comment)
  }
}
