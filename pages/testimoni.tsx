import Main from 'components/Main'
import Meta from 'components/Meta'

const Testimon = () => {
  return (
    <>
      <Meta title='Testimoni - Jesho' />
      <Main>
        <h1 className='mt-12 px-4 text-center text-5xl'>Testimoni</h1>
        <main className='mx-auto min-h-screen max-w-screen-md'>
          <section>
            <ol className='mt-12 flex gap-8 text-xl [&>li]:border [&>li]:p-4 [&>li>p]:mb-4 [&>li:hover]:shadow'>
              <li>
                <p>
                  Hasilnya bagus, pengiriman cepat. saya order h-6 lebaran h-2
                  lebaran sudah dikirim. terima kasih Jesho.
                </p>
                <span>- Heri -</span>
              </li>
              <li>
                <p>
                  Bagus banget setelah dipasang, sesuai pesanan saya. Seller
                  sabar dan sangat membantu proses pembuatan, puas sekali.
                </p>
                <span>- Prisci Lia -</span>
              </li>
              <li>
                <p>
                  Mantap Sekali, Saya order nomer meja 200pc 6 hari sudah jadi,
                  saya pikir akan lama sampai 3 minggu, ternyata Cepat.
                </p>
                <span>- Ryan -</span>
              </li>
            </ol>
          </section>
        </main>
      </Main>
    </>
  )
}

export default Testimon
