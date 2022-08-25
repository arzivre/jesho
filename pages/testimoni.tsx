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
            <ol
              className='mt-12 grid grid-cols-1 gap-8 text-xl md:grid-cols-2 lg:grid-cols-3 [&>li]:border [&>li]:p-4 [&>li]:shadow [&>li>p]:mb-4
              [&>li:hover]:shadow-xl'
            >
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
              <li>
                <p>
                  seller ramah, harga murah, pelayanan memuaskan. pesan pagi
                  siang sudah jadi
                </p>
                <span>- Rahmad -</span>
              </li>
              <li>
                <p>
                  Pembuatan pertama salah, tapi langsung di ganti dengan yang
                  baru, proses pembuatan cepat, bisa langsung pasang di daerah
                  semarang
                </p>
                <span>- Andy -</span>
              </li>
              <li>
                <p>Langganan selalu, hasil produksinya sesuai ekspetasi</p>
                <span>- Dina -</span>
              </li>
              <li>
                <p>
                  Harga bersaing pembuatan neon box, senin pesan rabu sudah di
                  pasang, Keren.
                </p>
                <span>- ayu _</span>
              </li>
              <li>
                <p>
                  Mesin sudah bisa menghasilkan cuan walau ada kendala tapi
                  masin bisa di benering, Mas Agil juga sabar dalam memberi
                  arahan
                </p>
                <span>- Adi -</span>
              </li>
              <li>
                <p>Seller dapat diajak diskusi dengan baik, Puas</p>
                <span>- Puas -</span>
              </li>
              <li>
                <p>Langganan sering di kasih bonus, seller baik sekali</p>
                <span>- Ana -</span>
              </li>
            </ol>
          </section>
        </main>
      </Main>
    </>
  )
}

export default Testimon
