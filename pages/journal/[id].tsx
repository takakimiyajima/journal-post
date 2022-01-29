import { GetServerSidePropsContext } from 'next'
import { useEffect, useContext } from 'react'
import { PostContext } from '@/contexts/post/postContext'
import { findPost } from '@/prisma/helpers/post'
import { PostEntity } from '@/prisma/helpers/postEntity'
import { Layout } from '@/components/layouts/Layout'
import { JournalIdScreen } from '@/components/screens/JournalIdScreen'

export const notFound = {
  props: {
    error: {
      statusCode: 404,
      message: "not found error",
    },
  },
}

export type TopPageProps = {
  post: PostEntity | null
  error?: {
    statusCode: number
    message: string
  }
}

const JournalIdPage = ({ post, error }: TopPageProps) => {
  if (error || !post) {
    return <p>Error.....</p>
  }

  const { dispatch } = useContext(PostContext)

  useEffect(() => {
    dispatch({
      type: 'UPDATE_POST',
      post
    })
  }, [])

  return (
    <Layout>
      <JournalIdScreen />
    </Layout>
  )
}

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const postId = Array.isArray(query.id) ? query.id[0] : query.id;
  // 404 when a postId miss,
  if (!postId) {
    return {
      notFound
    }
  }

  const post = await findPost(postId)

  return {
    props: {
      post
    },
  }
}

export default JournalIdPage
