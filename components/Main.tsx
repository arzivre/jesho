import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Skeleton } from '@mantine/core'

const JeshoFooter = dynamic(() => import('./Footer'), { suspense: true })
const JeshoHeader = dynamic(() => import('./Header'), { suspense: true })

const links = [
  {
    link: '/',
    label: 'Home',
  },
  {
    link: '/blog',
    label: 'Blog',
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
        label: 'houseofjesho@gmail.com',
        link: '#',
      },
      {
        label: '0858 5081 9996',
        link: '#',
      },
      {
        label: 'Semarang, Jawa Tengah',
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
      <Suspense fallback={<Skeleton height={56} />}>
        <JeshoHeader links={links} />
      </Suspense>
      {children}
      <Suspense fallback={<Skeleton height={350} />}>
        <JeshoFooter data={data} />
      </Suspense>
    </>
  )
}
export default Main
