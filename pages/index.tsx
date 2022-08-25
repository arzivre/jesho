import Main from 'components/Main'
import Meta from 'components/Meta'

const Home = () => {
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
              alt='laser cutting machine, photo by Opt Lasers'
              className='mb-4 h-80 bg-contain  bg-center bg-no-repeat lg:h-[500px]'
            />
          </picture>
          <section className='mx-auto max-w-screen-md'>
            <p className='mb-4'>
              Penggunaan dekorasi hasil Cutting dalam rumah, kantor, tempat
              Wisata, dan bangunan lainya. semakin banyak di gandrungi
              masayrakat contoh saja ACP Cutting.
            </p>
            <p className='mb-4'>
              ACP Cutting yang memiliki warna dan motif cutting yang menarik
              tidak hanya menjadi hiasan bangunan bangunan saja, tapi juga bisa
              untuk skat ruagan, facade bangunan, jendela, dll.
            </p>

            <p className='mb-4'>
              ACP cutting terbuat dari aluminium selain untuk dekorasi dapat
              digunakan untuk mengatur sirkulasi udara Untuk mengukir / memotong
              ACP bisa menggunkan mesin CNC Router. Mesin CNC Reutoer dapat
              memotong pola sedang hingga rumit contoh - contoh pola geometric,
              arabic, floral dll
            </p>
          </section>
          <div className='my-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            <picture>
              <img src='images/home/pen1.png' alt='penerapan cutting laser' />
            </picture>
            <picture>
              <img src='images/home/pen2.png' alt='penerapan cutting laser' />
            </picture>
            <picture>
              <img src='images/home/pen3.png' alt='penerapan cutting laser' />
            </picture>
          </div>
          <p className='mx-auto mb-4 max-w-screen-md'>
            Kami menyediakan Jasa cutting Laser dan Router, Bahan yang bisa kami
            kerjakan untuk laser dan router: ACP, Akrilik, Kayu, Plywood, PVC,
            Kain, Kulit, MDF, HMR
          </p>
          <div className='my-10 grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5'>
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
          <p className='mx-auto mb-4 max-w-screen-md'>
            Bahan ini bisa kami cutting dan ukir harga Jasa cutting tidak selalu
            sama, harga mengikuti material dan pola gambar serta ukuran selain
            ACP cutting juga ada huruf timbul akrilik yang biasa digunakan untuk
            pembuatan papan nama / sign / letter timbul
          </p>
          {/* <div className='my-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            <picture>
              <img src='images/home/pen1.png' alt='penerapan cutting laser' />
            </picture>
            <picture>
              <img src='images/home/pen2.png' alt='penerapan cutting laser' />
            </picture>
            <picture>
              <img src='images/home/pen3.png' alt='penerapan cutting laser' />
            </picture>
          </div> */}
          <section className='mx-auto max-w-screen-md'>
            <p className='mb-4'>
              membuat huruf timbul bisasanya menggunakan bahan akrilik untuk
              memotong akrilik memakai mesin laser. hasil cutting CNC rapi dan
              cepat sehingga lebih efektif dan efieseien selain jasa cutting
              kita juga menjual mesinya. mesin cnc laser dan router
            </p>

            <ol className='mb-4'>
              <li>Cnc Router 1200 watt </li>
              <li>Uk 122x244 25 jt</li>
              <li>Uk 122x122 23 jt</li>
            </ol>
            <p className='mb-4'>
              Kontroler pakai karya cnc wifi (Compact) Di kontrol dengan remot
              (include) degan hp atau langsung laptop/pc Penyimpanan maks.gcode
              40 file Spindel pakai DCA 1200 watt Body ACP Kontroler set di axis
              X Motor steper nema 23 Rell x bearing dan holo 4x6 belt Rell y
              bearing dan pipa 1,5 inc belt Di ajarin smpe bisa Garansi 3 bulan
              Sparepart banyak di marketplace Atau kita stok juga Po 3 Minggu ka
            </p>

            <ol className='mb-4'>
              <li>laser 60 watt</li>
              <li>122x244 30 jt</li>
              <li>122x122 28 jt</li>
            </ol>
            <p className='mb-4'>
              Body pakay playwood dan acp rangka besi Kontroler karya cnc wifi (
              nempel /ikut body X ) bisa kontrol degan remot, hp atau laptop
              lansgung. Kirim file gcode lewat wifi. Bisa save sampe 40 file.
              Tabung 60 watt pakai hardray. Rell x pakai as stainles penggerak
              nema 17 dgn belt Rell y pakai pipa besi Penggerak nema 23 degan
              belt Hasil ttp presisi Dapat training online Masuk grup wa yang
              dapat sharing produk, trouble, dll.
            </p>
          </section>
        </main>
      </Main>
    </>
  )
}

export default Home
