import { useDisclosure } from '@mantine/hooks'
import useAuth, { signinWithGoogle, signout } from 'hooks/useAuth'
import useCart from 'hooks/useCart'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Suspense } from 'react'

import {
  ActionIcon,
  Avatar,
  Burger,
  createStyles,
  Group,
  Loader,
  Menu,
  Paper,
  Text,
  Transition,
} from '@mantine/core'
import { BiChevronDown, BiUserCircle } from 'react-icons/bi'
import { BsBucket } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

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
    label: 'Produk',
  },
  {
    link: '/pola',
    label: 'Pola',
  },
  {
    link: '/harga',
    label: 'Daftar Harga',
  },
  {
    link: '/contact',
    label: 'Kontak Kami',
  },
  {
    link: '/testimoni',
    label: 'Testimoni',
  },
]

const UserMenu = () => {
  const { classes, theme, cx } = useStyles()
  let { currentUser: user }: any = useAuth()
  const [opened, handlers] = useDisclosure(false)

  const router = useRouter()

  return (
    <>
      <Menu position='bottom-end' withArrow>
        <Menu.Target>
          <button className='mt-2'>
            <Group spacing={7}>
              {user ? (
                <Avatar
                  src={user.photoURL}
                  alt={user.name}
                  radius='xl'
                  size={20}
                />
              ) : (
                <BiUserCircle size={20} />
              )}
              <Text
                className={classes.userMenu}
                weight={500}
                size='sm'
                sx={{ lineHeight: 1 }}
                mr={3}
              >
                {user ? user.name : 'Guest'}
              </Text>
              <BiChevronDown size={12} />
            </Group>
          </button>
        </Menu.Target>

        <Menu.Dropdown>
          {user ? (
            <>
              <NextLink href={'/order'} prefetch={false}>
                <a className={classes.link} style={{ padding: 0 }}>
                  <Menu.Item
                    icon={<BsBucket size={14} color={theme.colors.blue[6]} />}
                  >
                    Order Lists
                  </Menu.Item>
                </a>
              </NextLink>
              <Menu.Item color='red' onClick={() => signout()}>
                Log out
              </Menu.Item>
            </>
          ) : (
            <Menu.Item
              icon={<FcGoogle size={14} />}
              onClick={() => signinWithGoogle(router.asPath)}
            >
              Log in
            </Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>
    </>
  )
}

const CartIcon = () => {
  let { sumItems } = useCart()
  let { itemCount } = sumItems()

  return (
    <>
      <NextLink href={'/cart'} passHref>
        <a>
          <ActionIcon size='lg'>
            <BsBucket size={14} />
            {itemCount > 0 && itemCount}
          </ActionIcon>
        </a>
      </NextLink>
    </>
  )
}

const Mobile = () => {
  let { classes, theme, cx } = useStyles()
  const [opened, handlers] = useDisclosure(false)

  return (
    <>
      <div className='flex gap-x-2 pt-2 lg:hidden'>
        <Burger opened={opened} onClick={() => handlers.toggle()} size='sm' />
        <span className='hidden pt-1 sm:block'>Menu</span>
      </div>
      <Transition transition='pop-top-right' duration={200} mounted={opened}>
        {(styles) => (
          <Paper className={classes.dropdown} withBorder style={styles}>
            <ol className='flex flex-col gap-4 px-4'>
              {links.map(({ label, link }) => (
                <li key={label} className='p-2'>
                  <NextLink href={link}>
                    <a className='block hover:underline'>{label}</a>
                  </NextLink>
                </li>
              ))}
            </ol>
          </Paper>
        )}
      </Transition>
    </>
  )
}

export const NewHeader = () => {
  return (
    <div className='sticky top-0 z-10  bg-white'>
      <header className='mx-auto flex max-w-screen-xl justify-between px-4'>
        <Mobile />

        <NextLink href='/'>
          <a>
            <h1 className='pt-2 text-2xl lg:text-3xl'>JESHO</h1>
          </a>
        </NextLink>

        <ol className='my-1 hidden gap-x-4 px-4 py-2 lg:flex [&>li>a]:py-1 [&>li>a]:px-2'>
          {links.map(({ label, link }) => (
            <NextLink key={label} href={link}>
              <a className='rounded px-2 py-1 hover:bg-gray-500 hover:text-gray-50'>
                {label}
              </a>
            </NextLink>
          ))}
        </ol>

        <ol className='flex gap-x-4 pt-2 '>
          <li>
            <Suspense fallback={<Loader />}>
              <UserMenu />
            </Suspense>
          </li>
          <li>
            <Suspense fallback={<Loader />}>
              <CartIcon />
            </Suspense>
          </li>
        </ol>
      </header>
    </div>
  )
}

export default NewHeader

const useStyles = createStyles((theme) => ({
  root: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    WebkitBackdropFilter: 'blur(8px)', // Safari
    backdropFilter: 'blur(8px)', // Chrome, Firefox
    boxShadow: ' 0px 10px 15px 10px rgb(0 0 0 / 1%)',
    backgroundColor: 'rgb(206 212 218 / 15%)',
    borderBottom: '1px solid rgb(206 212 218 / 40%)',
  },
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,

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
    zIndex: 1,
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
