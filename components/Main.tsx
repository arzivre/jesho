import { JeshoFooter } from './Footer'
import { JeshoHeader } from './Header'
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
      <JeshoHeader links={links} />
      {children}
      <JeshoFooter data={data} />
    </>
  )
}
export default Main
