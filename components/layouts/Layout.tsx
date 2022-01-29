import { ReactNode } from 'react'
import styled from 'styled-components'
import { Header } from '@/components/layouts/Header'

type Props = {
  children: ReactNode
}

const Wrapper = styled.div`
  margin: 100px;
`

export const Layout = ({ children }: Props) => (
  <>
    <Header />
    <Wrapper>
      <div className="layout">{children}</div>
    </Wrapper>
  </>
)
