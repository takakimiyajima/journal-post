import { useContext, useEffect } from 'react'
import { PostContext } from '@/contexts/post/postContext'
import { fetchPosts } from '@/prisma/helpers/post'
import { Layout } from '@/components/layouts/Layout'
import { TopScreen } from '@/components/screens/TopScreen'
import { PostEntity } from '@/prisma/helpers/postEntity'

export type TopPageProps = {
  posts: Array<PostEntity>
  error?: {
    statusCode: number
    message: string
  }
}

const TopPage = ({ posts }: TopPageProps) => {
  const { dispatch } = useContext(PostContext)

  /** NOTE: Update posts from API */
  useEffect(() => {
    dispatch({
      type: 'UPDATE_POSTS',
      posts
    })
  }, [])

  return (
    <Layout>
      <TopScreen />
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const posts = await fetchPosts()

  return {
    props: {
      posts,
    },
  }
}

export default TopPage
