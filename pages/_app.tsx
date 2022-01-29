import { ReactNode } from 'react'
import type { AppProps } from 'next/app'
import { Provider, signIn, useSession } from 'next-auth/client'
import { ThemeProvider } from 'styled-components'
import Head from 'next/head'
import { theme } from '@/constants/theme'
import '../styles/destyle.css'
import '../styles/globals.css'
import { PostContextProvider } from '@/contexts/post/postProvider'

export interface ProviderProps {
  children: ReactNode
}

export const NeedLogin = ({ children }: ProviderProps) => {
  const [session, loading] = useSession()
  if (loading) {
    return <></>
  }

  if (!session) {
    signIn()
    return <></>
  }

  return <>{children}</>
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta name="format-detection" content="telephone=no" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
        />
        <meta httpEquiv="content-language" />
      </Head>
        <Provider session={pageProps.session}>
          <NeedLogin>
            <ThemeProvider theme={theme}>
              <PostContextProvider>
                <Component {...pageProps} />
              </PostContextProvider>
          </ThemeProvider>
          </NeedLogin>
        </Provider>
    </>
  )
}

export default MyApp
