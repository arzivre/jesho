import type { NextPage } from 'next'
import Head from 'next/head'
import Main from 'components/Main'
import SubBanner from 'components/Home/SubBanner'

const Shop: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shop - Jesho</title>
      </Head>
      <Main>
        <SubBanner />
      </Main>
    </>
  )
}
export default Shop
