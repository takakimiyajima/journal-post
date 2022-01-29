import { useRouter } from 'next/router'
import styled from 'styled-components'
import { PostEntity } from '@/prisma/helpers/postEntity'

type ContainerProps = {
  post: PostEntity
}

type Props = {
  className?: string
} & ContainerProps

const Component = ({
  className,
  post
}: Props) => {
  const router = useRouter();

  const commentStr = !!post.comments.length
    ? `${post.comments.length} comments`
    : `${post.comments.length} comment`

  return (
    <button
      className={className}
      onClick={() => router.push(`/journal/${post.id}`)}
    >
      <div className='header'>
        <h2>{post.title}</h2>
        <p className='date'>Posted at {post.createdAt}</p>
      </div>
      <div className='content'>{post.content}</div>
      <div className='comment'>{commentStr}</div>
    </button>
  )
}

const StyledComponent = styled(Component)`
  margin: 0 40px;
  border: 1px solid ${(props) => props.theme.colors.darkBrown};
  border-radius: 0.75rem;
  overflow: hidden;
  opacity: 1;
  transition: opacity 0.4s ease-out;
  
  &:nth-child(n + 3) {
    margin-top: 60px;
  }

  &:hover {
    opacity: 0.6;
    transition: opacity 0.4s ease-out;
  }

  > .header {
    padding: 8px 12px;
    background: ${(props) => props.theme.colors.lightBrown};
    font-size: 1.25rem;

    > .date {
      font-size: 0.75rem;
    }
  }

  > .content {
    padding: 10px 12px;
  }

  > .comment {
    display: flex;
    justify-content: center;
    padding: 2px 0;
    border-top: 1px solid ${(props) => props.theme.colors.gray};
  }
`

export const Journal = (props: Props) => {
  return <StyledComponent {...props} />
}
