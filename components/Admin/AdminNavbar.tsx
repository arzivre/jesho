import NextLink from 'next/link'
import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  Anchor,
} from '@mantine/core'
import { Notes, Gauge } from 'tabler-icons-react'

const mockdata = [
  { href: '/admin/', label: 'Dashboard', icon: Gauge },
  { href: '/admin/product', label: 'Products', icon: Notes },
  { href: '/admin/product/upload', label: 'Upload Product', icon: Notes },
  { href: '/admin/blog', label: 'Blog', icon: Notes },
  { href: '/admin/blog/upload', label: 'Create Blog', icon: Notes },
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
        <Anchor>{item.label}</Anchor>
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
