import { useRouter } from 'next/router'
import { signOut } from 'next-auth/client'
import Link from 'next/link'
import styled from 'styled-components'

type Props = {
  className?: string
}

const Component = ({ className }: Props) => {
  const { pathname } = useRouter()
  const isTopPage = pathname === '/'

  return (
    <header className={className}>
      <div className="header-top">
        {!isTopPage && (
          <Link href='/'>
            <a className='back'>{'< Back'}</a>
          </Link>
        )}
        <Link href='/'>
          Online Journal
        </Link>
        <button
          className='logout'
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    </header>
  )
}

const StyledComponent = styled(Component)`
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  overflow-y: hidden;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.275s ease-in-out;
  width: 100%;
  z-index: 50;

  > .header-top {
    position: relative;
    margin: auto 0;
    text-align: center;
    background: ${(props) => props.theme.colors.white};
    font-size: 2.25rem;
    font-weight: bold;

    .back {
      position: absolute;
      top: 50%;
      left: 20px;
      transform: translateY(-50%);
      font-size: 1rem;
      font-weight: 400;
      transition: all 0.4s;
      text-decoration: underline;
    }

    > .logout {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      transition: all 0.4s;
      padding: 4px 10px;
      font-size: 1rem;
      font-weight: 400;
      color: ${(props) => props.theme.colors.white};
      background: ${(props) => props.theme.colors.darkGray};
      border-radius: 0.75rem;
      opacity: 1;
      transition: opacity 0.4s ease-out;

      &:hover {
        opacity: 0.6;
        transition: opacity 0.4s ease-out;
      }
    }
  }
`

export const Header = (props: Props) => {
  return <StyledComponent {...props} />
}
