import { Group } from '@mantine/core'
import Main from 'components/Main'
import Meta from 'components/Meta'
import { ImFacebook2, ImInstagram } from 'react-icons/im'
import { SiTiktok } from 'react-icons/si'

const ContactPage = () => {
  return (
    <>
      <Meta title='Kontak Kami - Jesho' />
      <Main>
        <main className='mx-auto min-h-screen max-w-screen-md text-xl'>
          <h1 className='mt-12 mb-6 font-serif text-4xl'>Hubungi Kami</h1>
          <p>kami selalu siap menerima chat</p>
          <section className='mb-20 mt-4 grid gap-x-8 gap-y-4 md:grid-cols-[auto_auto] md:gap-y-2'>
            <p className='text-black'>E-mail</p>
            <p>houseofjesho@gmail.com</p>
            <p className='text-black'>Phone</p>
            <p>0858 5081 9996</p>
            <p className='text-black'>Alamat</p>
            <p>Semarang, Jawa Tengah.</p>
          </section>
          <section>
            <ol className='my-10 flex gap-x-4 [&>li>a:hover]:text-blue-500'>
              <li>
                <a
                  href='https://www.instagram.com/houseofjesho/?hl=id'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <ImInstagram size={18} />
                </a>
              </li>
              <li>
                <a
                  href='https://www.facebook.com/houseofjesho/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <ImFacebook2 size={18} />
                </a>
              </li>
              <li>
                <a
                  href='https://vt.tiktok.com/ZSdRJ9o4o'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <SiTiktok size={18} />
                </a>
              </li>
            </ol>
          </section>
        </main>
      </Main>
    </>
  )
}

export default ContactPage
