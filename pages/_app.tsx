import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import useIsMounted from 'hooks/useIsMounted'
import { AppProps } from 'next/app'
import '../styles/global.css'

export default function Wrapper(props: AppProps) {
  let isMounted = useIsMounted()

  return isMounted && <App {...props} />
}

function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>

      <MantineProvider
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',

          fontFamily: 'Varela Round, sans-serif',
          headings: { fontFamily: 'Greycliff CF, sans-serif' },

          shadows: 'sm',
        }}
      >
        <NotificationsProvider>
            <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </>
  )
}
