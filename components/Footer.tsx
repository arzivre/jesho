import {
  Anchor,
  Container,
  createStyles,
  Group,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core'
import NextLink from 'next/link'
import { ImFacebook2, ImInstagram } from 'react-icons/im'
import { SiTiktok } from 'react-icons/si'

const useStyles = createStyles((theme) => ({
  footer: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  logo: {
    maxWidth: 400,

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  description: {
    marginTop: 5,

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  groups: {
    display: 'flex',
    justifyContent: 'space-around',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'row',
    },
  },

  link: {
    display: 'block',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[8],
    fontSize: theme.fontSizes.sm,
    margin: '0 10px',
    padding: 6,

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginLeft: 10,
    marginBottom: theme.spacing.xs / 2,
    padding: 6,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  afterFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
    },
  },
}))

interface FooterProps {
  data: {
    title: string
    links: { label: string; link: string }[]
  }[]
}

export const JeshoFooter = ({ data }: FooterProps) => {
  const { classes } = useStyles()
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component='a'
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ))

    return (
      <div key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    )
  })
  return (
    <footer className={classes.footer}>
      <Container size='xl'>
        <SimpleGrid cols={2} className={classes.inner}>
          <div className={classes.logo}>
            <Title order={2}>Jesho</Title>
            <Text size='lg' className={classes.description}>
              Be the first to know about new collections, spesial, events, and
              whats going on at Jesho
            </Text>
          </div>
          <div className={classes.groups}>
            {groups}
            <div>
              <Text className={classes.title}>Follow Us</Text>
              <NextLink
                href='https://www.instagram.com/houseofjesho/?hl=id'
                passHref
              >
                <Text className={classes.link} component='a'>
                  <Group>
                    <ImInstagram size={18} /> @houseofjesho
                  </Group>
                </Text>
              </NextLink>
              <NextLink href='https://www.facebook.com/houseofjesho/' passHref>
                <Text<'a'> className={classes.link} component='a'>
                  <Group>
                    <ImFacebook2 size={18} /> @houseofjesho
                  </Group>
                </Text>
              </NextLink>
              <NextLink href='https://vt.tiktok.com/ZSdRJ9o4o' passHref>
                <Text<'a'> className={classes.link} component='a'>
                  <Group>
                    <SiTiktok size={18} />
                    @houseofjesho
                  </Group>
                </Text>
              </NextLink>
            </div>
          </div>
        </SimpleGrid>
      </Container>

      <Container size='xl' className={classes.afterFooter}>
        <Text color='dimmed' size='sm'>
          © 2022 HOUSE OF JESHO | Made by{' '}
          <Anchor href='https://arzivre.com'>Arzivre</Anchor>
        </Text>

        <Group spacing={8} className={classes.social} position='right' noWrap>
          <Text color='dimmed' size='sm'>
            Privacy Policy
          </Text>
          <Text color='dimmed' size='sm'>
            Terms
          </Text>
        </Group>
      </Container>
    </footer>
  )
}
export default JeshoFooter
