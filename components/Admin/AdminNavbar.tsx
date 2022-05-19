import {
  Button,
  Code,
  createStyles,
  Group,
  Navbar,
  ScrollArea,
  Text,
} from '@mantine/core'
import NextLink from 'next/link'

const mockdata = [
  { href: '/admin/', label: 'Dashboard' },
  { href: '/admin/order', label: 'Order' },
  { href: '/admin/product', label: 'Products' },
  {
    href: '/admin/product/upload',
    label: 'Upload Product',
  },
  { href: '/admin/blog', label: 'Blog' },
  {
    href: '/admin/blog/upload',
    label: 'Create Blog',
  },
]

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: theme.spacing.md,
    marginRight: theme.spacing.md,
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
}))

const AdminNavbar = () => {
  const { classes } = useStyles()
  const links = mockdata.map((item) => (
    <div key={item.label}>
      <NextLink href={item.href} passHref>
        <Button
          component='a'
          fullWidth
          variant='gradient'
          gradient={{ from: 'teal', to: 'lime', deg: 105 }}
          mb={20}
          style={{
            fontFamily: 'sans-serif',
          }}
        >
          {item.label}
        </Button>
      </NextLink>
    </div>
  ))

  return (
    <>
      <Navbar.Section className={classes.header}>
        <Group position='apart'>
          <p>House Of Jesho</p>
          <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
    </>
  )
}
export default AdminNavbar
