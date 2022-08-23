import Main from 'components/Main'
import Meta from 'components/Meta'
import { Tabs } from '@mantine/core'
import { useState } from 'react'

const PolaTabs = () => {
  const [activeTab, setActiveTab] = useState<string | null>('batik')

  return (
    <Tabs
      value={activeTab}
      onTabChange={setActiveTab}
      // variant='outline'
      color='dark'
      className='font-serif text-xl'
    >
      <Tabs.List
        position='center'
        className='container my-10 mx-auto lg:gap-x-20'
      >
        <Tabs.Tab value='batik'>Batik</Tabs.Tab>
        <Tabs.Tab value='geometric'>Geometric</Tabs.Tab>
        <Tabs.Tab value='floral'>Floral</Tabs.Tab>
        <Tabs.Tab value='arabic'>Arabic</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel className='bg-gray-100' value='batik' pt='xs'>
        {batik}
      </Tabs.Panel>

      <Tabs.Panel className='bg-gray-100' value='geometric' pt='xs'>
        {geometric}
      </Tabs.Panel>

      <Tabs.Panel className='bg-gray-100' value='floral' pt='xs'>
        {floral}
      </Tabs.Panel>
      <Tabs.Panel className='bg-gray-100' value='arabic' pt='xs'>
        {arabic}
      </Tabs.Panel>
    </Tabs>
  )
}

const PolaPage = () => {
  return (
    <>
      <Meta title='Pola - Jesho'/>
      <Main>
        <main className='mx-auto my-10 max-w-screen-xl px-4'>
          <h1 className='mb-4 font-serif text-5xl'>KOLEKSI DESAIN</h1>
          <p>
            Pilihan pola yang sesuai mampu membangun keseluruhan konsep
            arsitektur bangunan anda. Berikut adalah beberapa desain yang telah
            kami pilih sesuai dengan trend arsitektur tahun 2020. Kami selalu
            menjaga agar koleksi ini tetap update untuk mengikut perkembangan
            terbaru.
          </p>

          <PolaTabs />
        </main>
      </Main>
    </>
  )
}

export default PolaPage

const batik = (
  <section className='mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
    <picture>
      <img src='images/pola/random/1.png' alt='tes' />
    </picture>
    <picture>
      <img src='images/pola/random/2.png' alt='tes' />
    </picture>
    <picture>
      <img src='images/pola/random/4.png' alt='tes' />
    </picture>
    <picture>
      <img src='images/pola/random/5.png' alt='tes' />
    </picture>
    <picture>
      <img src='images/pola/random/6.png' alt='tes' />
    </picture>
    <picture>
      <img src='images/pola/random/7.png' alt='tes' />
    </picture>
    <picture>
      <img src='images/pola/random/3.png' alt='tes' />
    </picture>
    <picture>
      <img src='images/pola/random/8.png' alt='tes' />
    </picture>
    <picture>
      <img src='images/pola/random/9.png' alt='tes' />
    </picture>
  </section>
)

const geometric = (
  <section className='mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
    <picture>
      <img src='images/pola/geometric/geo(1).png' alt='geomtric' />
    </picture>
    <picture>
      <img src='images/pola/geometric/geo(2).png' alt='geomtric' />
    </picture>
    <picture>
      <img src='images/pola/geometric/geo(3).png' alt='geomtric' />
    </picture>
    <picture>
      <img src='images/pola/geometric/geo(4).png' alt='geomtric' />
    </picture>
    <picture>
      <img src='images/pola/geometric/geo(5).png' alt='geomtric' />
    </picture>
    <picture>
      <img src='images/pola/geometric/geo(6).png' alt='geomtric' />
    </picture>
    <picture>
      <img src='images/pola/geometric/geo(7).png' alt='geomtric' />
    </picture>
    <picture>
      <img src='images/pola/geometric/geo(8).png' alt='geomtric' />
    </picture>
  </section>
)

const floral = (
  <section className='mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
    <picture>
      <img src='images/pola/floral/flo1.png' alt='pola floral' />
    </picture>
    <picture>
      <img src='images/pola/floral/flo2.png' alt='pola floral' />
    </picture>
    <picture>
      <img src='images/pola/floral/flo3.png' alt='pola floral' />
    </picture>
    <picture>
      <img src='images/pola/floral/flo4.png' alt='pola floral' />
    </picture>
    <picture>
      <img src='images/pola/floral/flo5.png' alt='pola floral' />
    </picture>
    <picture>
      <img src='images/pola/floral/flo6.png' alt='pola floral' />
    </picture>
    <picture>
      <img src='images/pola/floral/flo7.png' alt='pola floral' />
    </picture>
    <picture>
      <img src='images/pola/floral/flo8.png' alt='pola floral' />
    </picture>
    <picture>
      <img src='images/pola/floral/flo9.png' alt='pola floral' />
    </picture>
    <picture>
      <img src='images/pola/floral/flo10.png' alt='pola floral' />
    </picture>
  </section>
)

const arabic = (
  <section className='mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
    <picture>
      <img src='images/pola/arabic/ar1.png' alt='pola floral' />
    </picture>
    <picture>
      <img src='images/pola/arabic/ar3.png' alt='pola floral' />
    </picture>
    <picture>
      <img src='images/pola/arabic/ar4.png' alt='pola floral' />
    </picture>
    <picture>
      <img src='images/pola/arabic/ar5.png' alt='pola floral' />
    </picture>
    <picture>
      <img src='images/pola/arabic/ar6.png' alt='pola floral' />
    </picture>
    <picture>
      <img src='images/pola/arabic/ar7.png' alt='pola floral' />
    </picture>
    <picture>
      <img src='images/pola/arabic/ar8.png' alt='pola floral' />
    </picture>
    <picture>
      <img src='images/pola/arabic/ar2.png' alt='pola floral' />
    </picture>
  </section>
)
