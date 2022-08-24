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
          <div>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62123425.37634149!2d19.028278114576043!3d18.131041213798525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70f38ef735cfa3%3A0x3cd5244e7c6bd059!2sjasa%20cutting%20Laser%20Router%20Jesho%20CNC!5e0!3m2!1sid!2sid!4v1661322822804!5m2!1sid!2sid'
              width='600'
              height='450'
              // style='border:0;'
              allowFullScreen={false}
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </main>
      </Main>
    </>
  )
}

export default ContactPage
