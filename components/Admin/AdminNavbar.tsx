import {
  Button,
  Code,
  createStyles,
  Group,
  Navbar,
  ScrollArea,
  Text,
  Title,
} from '@mantine/core'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const data = [
  // { href: '/admin/', label: 'Dashboard' },
  // { href: '/admin/order', label: 'Order' },
  // { href: '/admin/user', label: 'User' },
  { href: '/admin/', label: 'Produk' },
  { href: '/admin/blog', label: 'Blog' },
  // { href: '/admin/penjualan', label: 'Penjualan' },
  { href: '/admin/category', label: 'Kategori' },
]

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    marginLeft: -theme.spacing.xs,
    marginRight: -theme.spacing.xs,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  link: {
    boxSizing: 'border-box',
    display: 'block',
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[0],
    padding: `0 ${theme.spacing.md}px`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: 44,
    lineHeight: '44px',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.lime[6],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  linkActive: {
    border: 0,
    background: `linear-gradient(135deg, ${theme.colors.orange[4]} 0%, ${theme.colors.violet[6]} 100%)`,
    color: theme.colors.blue[0],
    '&:hover': {
      backgroundColor: theme.colors.violet[0],
    },
  },
}))

const AdminNavbar = () => {
  const router = useRouter()
  const { classes, cx } = useStyles()

  const links = data.map((item) => (
    <div key={item.label} className='mx-4'>
      <NextLink href={item.href} passHref>
        <button
          className='mb-2 block w-full bg-gray-700
        px-3 py-3 text-gray-50 hover:bg-gray-300 hover:text-gray-900'
        >
          {item.label}
        </button>
      </NextLink>
    </div>
  ))

  return (
    <>
      <Navbar.Section
        grow
        className='boder-b-2 bg-gray-800 shadow'
        component={ScrollArea}
      >
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
    </>
  )
}
export default AdminNavbar
