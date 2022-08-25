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
        <NotificationsProvider>
            <Component {...pageProps} />
        </NotificationsProvider>
    </>
  )
}
