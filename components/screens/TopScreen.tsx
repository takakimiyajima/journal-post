import { useContext } from 'react'
import { PostContext } from '@/contexts/post/postContext'
import styled from 'styled-components'
import { Journal } from '@/components/blocks/JournalBox'
import { PostEntity } from '@/prisma/helpers/postEntity'

type Props = {
  className?: string;
}

const Component = ({ className }: Props) => {
  const { posts } = useContext(PostContext)

  return (
    <div className={className}>
      {posts.map((post, index) => (
        <Journal
          key={`journal-${index}`}
          className='journal'
          post={post}
        />
      ))}
    </div>
  )
}

const StyledComponent = styled(Component)`
  padding: 30px 100px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .journal {
    width: calc(50% - 80px);
    flex-basis: auto;
  }
`

export const TopScreen = (props: Props) => {
  return <StyledComponent {...props} />
}
