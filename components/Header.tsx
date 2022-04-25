import React, { useState } from 'react'
import NextLink from 'next/link'
import {
  createStyles,
  Header,
  Group,
  ActionIcon,
  Container,
  Burger,
  Transition,
  Paper,
} from '@mantine/core'
import { useBooleanToggle } from '@mantine/hooks'
import { Bucket, User } from 'tabler-icons-react'

const useStyles = createStyles((theme) => ({
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
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}))

interface JeshoHeaderProps {
  links: { link: string; label: string }[]
}

export const JeshoHeader = ({ links }: JeshoHeaderProps) => {
  const [opened, toggleOpened] = useBooleanToggle(false)
  const [active, setActive] = useState(links[0].link)
  const { classes, cx } = useStyles()

  const items = links.map((link) => (
    <NextLink key={link.label} href={link.link} passHref>
      <a
        className={cx(classes.link, {
          // [classes.linkActive]: active === link.link,
        })}
        onClick={(event) => {
          setActive(link.link)
        }}
      >
        {link.label}
      </a>
    </NextLink>
  ))

  return (
    <Header height={56} mb={10}>
      <Container size='xl' className={classes.inner}>
        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          size='sm'
          className={classes.burger}
        />
        <Group className={classes.links} spacing={5}>
          {items}
        </Group>
        <Transition transition='pop-top-right' duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
        <h1>JESHO</h1>

        <Group spacing={0} className={classes.social} position='right' noWrap>
          <ActionIcon size='lg'>
            <User size={24} />
          </ActionIcon>
          <ActionIcon size='lg'>
            <Bucket size={24} />
          </ActionIcon>
        </Group>
      </Container>
    </Header>
  )
}

export default JeshoHeader
