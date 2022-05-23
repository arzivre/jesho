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
  { href: '/admin/', label: 'Dashboard' },
  { href: '/admin/order', label: 'Order' },
  { href: '/admin/user', label: 'User' },
  { href: '/admin/product', label: 'Products' },
  { href: '/admin/blog', label: 'Blog' },
  { href: '/admin/category', label: 'Category' },
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
  const [active, setActive] = useState(router.pathname)
  const { classes, cx } = useStyles()

  const links = data.map((item) => (
    <div key={item.label}>
      <NextLink href={item.href} passHref>
        <Button
          component='a'
          fullWidth
          mb={20}
          onClick={() => setActive(item.href)}
          className={cx(classes.link, {
            [classes.linkActive]: active === item.href,
          })}
        >
          {item.label}
        </Button>
      </NextLink>
    </div>
  ))

  return (
    <>
      <Navbar.Section className={classes.header}>
        <Text align='center' size='xl'>
          {active === '/admin'
            ? 'Dashboard'
            : active.replace('/admin', '').replace('/', '').toUpperCase()}
        </Text>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
    </>
  )
}
export default AdminNavbar
