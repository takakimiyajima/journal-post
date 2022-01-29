import React, { useReducer, ReactNode } from 'react'
import { PostContext } from './postContext'
import { PostEntity } from '@/prisma/helpers/postEntity'

export type State = {
  posts: Array<PostEntity>
  post: PostEntity
};

export const initialState: State = {
  posts: [],
  post: {
    id: 0,
    authorId: 0,
    content: '',
    title: '',
    createdAt: '',
    comments: [],
  }
};

export type Action =
  | { type: 'UPDATE_POSTS', posts: Array<PostEntity> }
  | { type: 'UPDATE_POST', post: PostEntity }
  | { type: 'UPDATE_POST_COMMENT', comment: string }

const PostReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_POSTS':
      return {
        ...state,
        posts: action.posts
      }
    case 'UPDATE_POST':
      return {
        ...state,
        post: action.post
      }
    case 'UPDATE_POST_COMMENT':
      state.post.comments.push(action.comment)
      return {
        ...state,
      }
    default:
      return state
  }
}

export interface ProviderProps {
  children?: React.ReactNode
}

export const PostContextProvider = ({
  children,
}: ProviderProps): JSX.Element => {
	const [state, dispatch] = useReducer(PostReducer, initialState)

	return (
		<PostContext.Provider
			value={{
				posts: state.posts,
				post: state.post,
				dispatch,
			}}
		>
			{children}
		</PostContext.Provider>
	)
}
