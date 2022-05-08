import { Suspense } from 'react'
import useAuth, { signinWithGoogle, signout } from 'hooks/useAuth'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import useCart from 'hooks/useCart'
import { useBooleanToggle } from '@mantine/hooks'

import { BsBucket } from 'react-icons/bs'
import { BiLogOut, BiChevronDown } from 'react-icons/bi'
import { FcGoogle } from 'react-icons/fc'

import {
  ActionIcon,
  Avatar,
  Burger,
  Container,
  createStyles,
  Group,
  Header,
  Loader,
  Menu,
  Paper,
  Text,
  Transition,
  UnstyledButton,
} from '@mantine/core'

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    position: 'sticky',
    top: 10,

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },

  links: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  social: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
  dropdown: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  userMenu: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
  },
  userActive: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}))

interface JeshoHeaderProps {
  links: { link: string; label: string }[]
}

export const JeshoHeader = ({ links }: JeshoHeaderProps) => {
  const { classes, theme, cx } = useStyles()
  let { currentUser: user }: any = useAuth()

  let { sumItems } = useCart()
  let { itemCount } = sumItems()

  const [opened, toggleOpened] = useBooleanToggle(false)
  const [userMenuOpened, setUserMenuOpened] = useBooleanToggle(false)

  const router = useRouter()

  const items = links.map((link) => (
    <NextLink key={link.label} href={link.link} passHref>
      <Text component='a' className={classes.link}>
        {link.label}
      </Text>
    </NextLink>
  ))

  const profileMenu = (
    <Menu
      size={260}
      placement='end'
      transition='pop-top-right'
      className={classes.userMenu}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      control={
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <Group spacing={7}>
            {user && (
              <Avatar
                src={user.photoURL}
                alt={user.name}
                radius='xl'
                size={20}
              />
            )}
            <Text weight={500} size='sm' sx={{ lineHeight: 1 }} mr={3}>
              {user ? user.name : 'Guest'}
            </Text>
            <BiChevronDown size={12} />
          </Group>
        </UnstyledButton>
      }
    >
      <NextLink href={'/order'} prefetch={false} passHref>
        <a className={classes.link} style={{ padding: 0 }}>
          <Menu.Item icon={<BsBucket size={14} color={theme.colors.blue[6]} />}>
            Order Lists
          </Menu.Item>
        </a>
      </NextLink>
      {user ? (
        <Menu.Item
          color='red'
          icon={<BiLogOut size={14} color='red' />}
          onClick={() => signout()}
        >
          Log out
        </Menu.Item>
      ) : (
        <Menu.Item
          icon={<FcGoogle size={14} />}
          onClick={() => signinWithGoogle(router.asPath)}
        >
          Log in
        </Menu.Item>
      )}
    </Menu>
  )

  return (
    <Header height={56} mb={10}>
      <Container size='xl' className={classes.inner}>
        <Suspense fallback={<Loader />}>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            size='sm'
            className={classes.burger}
          />
        </Suspense>

        <Suspense fallback={<Loader />}>
          <Group className={classes.links} spacing={5}>
            {items}
          </Group>
        </Suspense>

        <Suspense fallback={<Loader />}>
          <Transition
            transition='pop-top-right'
            duration={200}
            mounted={opened}
          >
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
              </Paper>
            )}
          </Transition>
        </Suspense>

        <Suspense fallback={<Loader />}>
          <h1>JESHO</h1>
        </Suspense>

        <Suspense fallback={<Loader />}>
          <Group spacing={0} className={classes.social} position='right' noWrap>
            {profileMenu}
            <NextLink href={'/cart'} passHref>
              <Text component='a'>
                <ActionIcon size='lg'>
                  <BsBucket size={14} />
                  {itemCount > 0 && itemCount}
                </ActionIcon>
              </Text>
            </NextLink>
          </Group>
        </Suspense>
      </Container>
    </Header>
  )
}

export default JeshoHeader
