import { AppProps } from 'next/app'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import NextNProgress from 'nextjs-progressbar'
import { Loader, MantineProvider } from '@mantine/core'

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
        }}
      >
        <NextNProgress />
        <Suspense fallback={<Loader />}>
          <Component {...pageProps} />
        </Suspense>
      </MantineProvider>
    </>
  )
}
