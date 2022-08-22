import type { GetStaticProps, NextPage } from 'next'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Container } from '@mantine/core'

import Main from 'components/Main'
import { Loading, LoadingFullScreen } from 'components/Loading'
import { db } from 'libs/firebase-admin'
import { ProductProps } from 'libs/types'
import Meta from 'components/Meta'

const Banner = dynamic(() => import('components/Home/Banner'), {
  suspense: true,
})
// const SubBanner = dynamic(() => import('components/Home/SubBanner'), {
//   suspense: true,
// })
// const GridBanner = dynamic(() => import('components/Home/GridBanner'), {
//   suspense: true,
// })

export const getStaticProps: GetStaticProps = async (context) => {
  const ref = await db
    .collection('products')
    .orderBy('createdAt', 'desc')
    .limit(5)
    .get()

  const products = ref.docs.map((doc) => {
    return { slug: doc.data().slug, imgUrl: doc.data().imgUrl }
  })

  return {
    props: { products },
    revalidate: 60,
  }
}
interface Props {
  products: [ProductProps]
}
const Home = ({ products }: Props) => {
  return (
    <>
      <Meta />

      <Main>
        <Suspense fallback={<LoadingFullScreen />}>
          <Banner />
        </Suspense>

        {/* <Suspense fallback={<LoadingFullScreen />}>
          <SubBanner images={products} />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <Container size='xl'>
            <GridBanner />
          </Container>
        </Suspense> */}
      </Main>
    </>
  )
}

export default Home
