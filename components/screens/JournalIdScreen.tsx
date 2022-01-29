import { useState, useCallback, useContext } from 'react'
import { PostContext } from '@/contexts/post/postContext'
import styled from 'styled-components'
import { PostEntity } from '@/prisma/helpers/postEntity'

type Props = {
  className?: string
}

const Component = ({ className }: Props) => {
  const [comment, setComment] = useState<string>('')
  let modComment = comment

  const { post, dispatch } = useContext(PostContext)

  const onSubmit = useCallback(async () => {
    const res = await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify({
        postId: post.id,
        comment
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json()

    if (json.ok) {
      dispatch({
        type: 'UPDATE_POST_COMMENT',
        comment: json.newPost.comment
      })
      modComment = ''
      setComment(() => modComment)
    } else {
      alert(JSON.stringify(json))
    }
  }, [comment])

  return (
    <div className={className}>
      <div className='header'>
        <h2>{post.title}</h2>
        <p className='date'>Posted at {post.createdAt}</p>
      </div>
      <div className='body'>
        <div className='content'>{post.content}</div>
        <div className='comment-container'>
          <p className='title'>Comments</p>
          <div className='comment-area'>
            {post.comments.map((comment, index) => (
              <div key={`comment-${index}`} className='comments'>
                <p className='comment'>{comment}</p>
              </div>
            ))}
          </div>
          <div className='input-are'>
            <input
              type='text'
              className='input'
              value={modComment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Write a public comment'
            />
            <button
              className='post-button'
              onClick={async () => await onSubmit()}
              disabled={!comment}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const StyledComponent = styled(Component)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  border: 1px solid ${(props) => props.theme.colors.darkBrown};
  border-radius: 0.75em;
  overflow: hidden;

  > .header {
    padding: 8px 12px;
    background: ${(props) => props.theme.colors.lightBrown};
    font-size: 1.25rem;

    > .date {
      font-size: 0.75rem;
    }
  }

  > .body {
    padding: 20px;

    > .comment-container {
      margin-top: 20px;
      border-top: 1px solid ${(props) => props.theme.colors.gray};

      > .title {
        margin-top: 20px;
      }

      > .comment-area {
        margin-top: 20px;

        > .comments {
          display: block;

          &:nth-child(n + 2) {
            margin-top: 10px;
          }

          > .comment {
            display: inline-block;
            padding: 10px;
            background-color: ${(props) => props.theme.colors.mediumGray};
            border-radius: 0.75rem;
          }
        }
      }

      > .input-are {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;

        > .input {
          width: 80%;
          padding: 4px 10px;
          border: 1px solid ${(props) => props.theme.colors.gray};
          border-radius: 0.75rem;
        }

        > .post-button {
          display: block;
          width: 16%;
          text-align: center;
          color: ${(props) => props.theme.colors.white};
          background: ${(props) => props.theme.colors.blue};
          box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
          border-radius: 0.75rem;
          opacity: 1;
          transition: opacity 0.4s ease-out;

          &:hover {
            &:not([disabled]) {
              opacity: 0.6;
              transition: opacity 0.4s ease-out;
            }
          }

          &:disabled {
            background-color: ${(props) => props.theme.colors.gray};
            cursor: not-allowed;
          }
        }
      }
    }
  }
`

export const JournalIdScreen = (props: Props) => {
  return <StyledComponent {...props} />
}
