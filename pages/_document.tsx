import { createGetInitialProps } from '@mantine/next'
import Document, { Head, Html, Main, NextScript } from 'next/document'

const getInitialProps = createGetInitialProps()

export default class _Document extends Document {
  static getInitialProps = getInitialProps

  render() {
    return (
      <Html lang='id'>
        <Head>
          <meta
            name='google-site-verification'
            content='Q09lyG8NjNM4n5aNLr64MUEbdaKbAPyaiggYJgAnE0o'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Varela+Round&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
