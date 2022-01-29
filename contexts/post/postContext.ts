import { createContext, Dispatch, SetStateAction } from 'react'
import { PostEntity } from '@/prisma/helpers/postEntity'

export interface PostContextType {
  posts: Array<PostEntity>
  post: PostEntity
  dispatch: any;
}

export const PostContext = createContext({} as PostContextType)
