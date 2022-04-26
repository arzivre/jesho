import type { NextPage } from 'next'
import { Suspense } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Container } from '@mantine/core'

import Loading from 'components/Loading'
import Main from 'components/Main'

const Banner = dynamic(() => import('components/Home/Banner'), {
  suspense: true,
})
const SubBanner = dynamic(() => import('components/Home/SubBanner'), {
  suspense: true,
})
const GridBanner = dynamic(() => import('components/Home/GridBanner'), {
  suspense: true,
})

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Main>
        <Suspense fallback={<Loading />}>
          <Container size='xl'>
            <Banner />
          </Container>
        </Suspense>

        <Suspense fallback={<Loading />}>
          <SubBanner />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <Container size='xl'>
            <GridBanner />
          </Container>
        </Suspense>
      </Main>
    </>
  )
}

export default Home
