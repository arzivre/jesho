import Main from 'components/Main'
import Meta from 'components/Meta'

const Harga = () => {
  return (
    <>
      <Meta title='Daftar Harga - Jesho' />
      <Main>
        <h1 className='mt-12 mb-4 px-4 text-center text-5xl'>Daftar Harga</h1>
        <main className='mx-auto min-h-screen max-w-screen-md'>
          <p className='mb-4'>
            Berikut daftar harga jasa cutting tidak termasuk bahan
          </p>
          <section className='grid grid-cols-1 lg:grid-cols-2'>
            <article>
              <h2 className='mb-2 text-3xl'>MDF / HMR / PVC</h2>
              <p className='mb-4 text-2xl'>Router</p>
              <ol className='text-xl [&>li]:mb-2'>
                <li>9,00 mm : Rp 215.000/m2</li>
                <li>12,0 mm : Rp 230.000/m2</li>
                <li>15,0 mm : Rp 245.000/m2</li>
                <li>18,0 mm : Rp 260.000/m2</li>
              </ol>
              <h3 className='mb-4 text-2xl'>ACP</h3>
              <ol className='text-xl [&>li]:mb-2'>
                <li>3,00 mm : Rp 160.000/m2</li>
                <li>4,00 mm : Rp 170.000/m2</li>
              </ol>
            </article>
            <article>
              <h2 className='mb-2 text-3xl'>Akrilic</h2>
              <p className='mb-4 text-2xl'>Laser</p>
              <ol className='text-xl [&>li]:mb-2'>
                <li>2,00 mm : Rp 150.000/m2</li>
                <li>3,00 mm : Rp 170.000/m2</li>
                <li>4,00 mm : Rp 190.000/m2</li>
                <li>5,00 mm : Rp 210.000/m2</li>
                <li>6,00 mm : Rp 230.00/m2</li>

                <li>8,00 mm : Rp 270.000/m2</li>
                <li>10,0 mm : Rp 300.000/m2</li>
                <li>GRAFIR : Rp 300.000/m2</li>
              </ol>
            </article>
          </section>
        </main>
      </Main>
    </>
  )
}

export default Harga
