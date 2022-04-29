import { AppProps } from 'next/app'
import { Suspense } from 'react'
import Head from 'next/head'
import NextNProgress from 'nextjs-progressbar'
import { Loader, MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { LoadingFullScreen } from 'components/Loading'

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>
      <Head>
        <title>Jesho</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',

          fontFamily: 'Varela Round, sans-serif',

          loader: 'bars',

          shadows: 'sm',
        }}
      >
        <NotificationsProvider>
          <NextNProgress />
          <Suspense fallback={<LoadingFullScreen />}>
            <Component {...pageProps} />
          </Suspense>
        </NotificationsProvider>
      </MantineProvider>
    </>
  )
}
