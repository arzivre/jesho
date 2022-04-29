import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Loading } from './Loading'

const JeshoFooter = dynamic(() => import('./Footer'), { suspense: true })
const JeshoHeader = dynamic(() => import('./Header'), { suspense: true })

const links = [
  {
    link: '/',
    label: 'Home',
  },
  {
    link: '/shop',
    label: 'Shop',
  },
]

const data = [
  {
    title: 'Contact Us',
    links: [
      {
        label: 'info@email.com',
        link: '#',
      },
      {
        label: '0812-3456-7891',
        link: '#',
      },
      {
        label: 'Semarang, Jawa Tengah',
        link: '#',
      },
    ],
  },
  {
    title: 'Follow Us',
    links: [
      {
        label: 'Instagram',
        link: '#',
      },
      {
        label: 'Facebook',
        link: '#',
      },
    ],
  },
]

interface MainProps {
  children: React.ReactNode
}

export const Main = ({ children }: MainProps) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <JeshoHeader links={links} />
      </Suspense>
      {children}
      <Suspense fallback={<Loading />}>
        <JeshoFooter data={data} />
      </Suspense>
    </>
  )
}
export default Main
