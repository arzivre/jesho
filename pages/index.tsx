import type { GetStaticProps, NextPage } from 'next'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Container, Skeleton } from '@mantine/core'

import Main from 'components/Main'
import { Loading, LoadingFullScreen } from 'components/Loading'
import { db } from 'libs/firebase-admin'
import { ProductProps } from 'libs/types'
import Meta from 'components/Meta'

// const Banner = dynamic(() => import('components/Home/Banner'), {
//   suspense: true,
// })
// const SubBanner = dynamic(() => import('components/Home/SubBanner'), {
//   suspense: true,
// })
// const GridBanner = dynamic(() => import('components/Home/GridBanner'), {
//   suspense: true,
// })

// export const getStaticProps: GetStaticProps = async (context) => {
//   const ref = await db
//     .collection('products')
//     .orderBy('createdAt', 'desc')
//     .limit(5)
//     .get()

//   const products = ref.docs.map((doc) => {
//     return { slug: doc.data().slug, imgUrl: doc.data().imgUrl }
//   })

//   return {
//     props: { products },
//     revalidate: 60,
//   }
// }
interface Props {
  products: [ProductProps]
}
const Home = ({ products }: Props) => {
  return (
    <>
      <Meta />

      <Main>
        <main className='mx-auto max-w-screen-xl px-4 text-xl'>
          <h1 className='mb-8 mt-12 text-center font-serif text-[calc(1em+5vw)] leading-none'>
            Jasa Cutting CNC Laser dan Router Semarang
          </h1>
          <picture className='flex items-center justify-center'>
            <img
              src='images/home/opt-lasers.jpg'
              alt='laser cutting machine'
              className='mb-4 h-80 bg-contain  bg-center bg-no-repeat lg:h-[500px]'
            />
          </picture>
          <section className='mx-auto max-w-screen-md'>
            <p className='mb-4'>
              Penggunaan dekorasi hasil Cutting dalam rumah, kantor, tempat
              Wisata, dan bangunan lainya. semakin banyak di gandrungi
              masayrakat contoh saja ACP Cutting. ACP Cutting yang memiliki
              warna dan motif cutting yang menarik tidak hanya menjadi hiasan
              bangunan bangunan saja, tapi juga bisa untuk skat ruagan, facade
              bangunan, jendela, dll.
            </p>

            <p>
              ACP cutting terbuat dari aluminium selain untuk dekorasi dapat
              digunakan untuk mengatur sirkulasi udara
            </p>
            <br />

            <p>
              Untuk mengukir / memotong ACP bisa menggunkan mesin CNC Router.
              Mesin CNC Reutoer dapat memotong pola sedang hingga rumit contoh -
              contoh pola geometric, arabic, floral dll
            </p>
          </section>
          <section className='my-10 flex gap-8 [&>picture]:border'>
            <picture>
              <img
                src='images/home/showcase1.jpg'
                alt='showcase produk 1'
                className='w-full'
              />
            </picture>
            <picture>
              <img
                src='images/home/showcase2.jpg'
                alt='showcase produk 2'
                className='w-full'
              />
            </picture>
            <picture>
              <img
                src='images/home/showcase3.jpg'
                alt='showcase produk 3'
                className='w-full'
              />
            </picture>
            <picture>
              <img
                src='images/home/showcase4.jpg'
                alt='showcase produk 4'
                className='w-full'
              />
            </picture>
          </section>
          <p className='mx-auto max-w-screen-md'>
            Kami menyediakan Jasa cutting Laser dan Router, Bahan yang bisa kami
            kerjakan untuk laser dan router: ACP, Akrilik, Kayu, Plywood, PVC,
            Kain, Kulit, MDF, HMR
          </p>
          <div className='my-10 flex gap-8'>
            <picture>
              <img src='images/home/gal1.jpg' alt='' />
            </picture>
            {/* <picture>
              <img src='images/home/gal2.jpg' alt='' />
            </picture> */}
            <picture>
              <img src='images/home/gal3.jpg' alt='' />
            </picture>
            <picture>
              <img src='images/home/gal4.jpg' alt='' />
            </picture>
            <picture>
              <img src='images/home/gal5.jpg' alt='' />
            </picture>
            <picture>
              <img src='images/home/gal6.jpg' alt='' />
            </picture>
          </div>
          <p className='mx-auto max-w-screen-md'>
            Bahan ini bisa kami cutting dan ukir harga Jasa cutting tidak selalu
            sama, harga mengikuti material dan pola gambar serta ukuran selain
            ACP cutting juga ada huruf timbul akrilik yang biasa digunakan untuk
            pembuatan papan nama / sign / letter timbul
          </p>
          <div className='my-10 flex gap-8'>
            <Skeleton height={400} />
            <Skeleton height={400} />
            <Skeleton height={400} />
          </div>
          <section className='mx-auto max-w-screen-md'>
            <p>
              membuat huruf timbul bisasanya menggunakan bahan akrilik untuk
              memotong akrilik memakai mesin laser. hasil cutting CNC rapi dan
              cepat sehingga lebih efektif dan efieseien selain jasa cutting
              kita juga menjual mesinya. mesin cnfc laser dan router
            </p>
            <br />
            <ol>
              <li>Cnc Router 1200 watt </li>
              <li>Uk 122x244 25 jt</li>
              <li>Uk 122x122 23 jt</li>
            </ol>
            <br />
            <p>
              Kontroler pakai karya cnc wifi (Compact) Di kontrol dengan remot
              (include) degan hp atau langsung laptop/pc Penyimpanan maks.gcode
              40 file Spindel pakai DCA 1200 watt Body ACP Kontroler set di axis
              X Motor steper nema 23 Rell x bearing dan holo 4x6 belt Rell y
              bearing dan pipa 1,5 inc belt Di ajarin smpe bisa Garansi 3 bulan
              Sparepart banyak di marketplace Atau kita stok juga Po 3 Minggu ka
            </p>
            <br />

            <ol>
              <li>laser 60 watt</li>
              <li>122x244 30 jt</li>
              <li>122x122 28 jt</li>
            </ol>
            <br />

            <p>
              Body pakay playwood dan acp rangka besi Kontroler karya cnc wifi (
              nempel /ikut body X ) bisa kontrol dgn dgn remot, hp atau laptop
              lansgung. Kirim file gcode lewat wifi . Bisa save sampe 40 file.
              Tabung 60 watt pakai hardray. Rell x pakai as stainles penggerak
              nema 17 dgn belt Rell y pakai pipa besi Penggerak nema 23 dgn belt
              Hasil ttp presisi Dpt training online Masuk grup wa yg dpt sharing
              produk, trouble, dn lain2
            </p>
            <br />

          </section>
        </main>
      </Main>
    </>
  )
}

export default Home
