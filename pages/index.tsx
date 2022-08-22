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
        <main className='mx-auto max-w-screen-xl px-4'>
          <section>
            <h2 className='text-4xl'>3 ALASAN UNTUK MULAI MENGGUNAKAN ORNAMEN LASER</h2>
            <p>
              Kenapa anda harus menggunakan jasa laser cutting dari kami? Karena
              terlepas dari jenis proyek, panel dari kami dapat digunakan untuk
              berbagai jenis kebutuhan interior maupun eksterior
            </p>
          </section>

          <section>
            <h2 className='text-4xl'>Siapa Kami</h2>
            <p>
              22Lasers merupakan brand dari PT Dua Dua Laserindo, sebuah
              perusahaan konstruksi profesional yang memberikan jasa laser
              cutting dan produksi panel ornamen dekoratif menggunakan mesin
              laser berkualitas tinggi untuk meningkatkan nilai estetika
              bangunan anda dengan harga terjangkau. Kantor pusat kami berlokasi
              di Malang dan Surabaya, dengan cabang pemasaran tersebar di Bali,
              Jakarta dan Banjarmasin. Hingga saat ini kami telah melayani
              pemesanan dan pelaksanaan proyek keseluruh Indonesia. Kami adalah
              pilihan terbaik untuk berbagai skala proyek arsitektural maupun
              interior.
            </p>
          </section>

          <section>

          </section>
        </main>

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
