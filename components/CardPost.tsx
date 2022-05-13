import React from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import { parseISO, format } from 'date-fns'
import { Card, Text, Group, useMantineTheme, createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: 'none',
  },

  title: {
    display: 'block',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
  },

  action: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}))

interface ArticleCardProps {
  image: string
  link: string
  title: string
  description: string
  publishedAt: string
  author: {
    name: string
    image?: string
  }
}
const CardPost = ({
  className,
  image,
  link,
  title,
  description,
  // author,
  publishedAt,
  ...others
}: ArticleCardProps &
  Omit<React.ComponentPropsWithoutRef<'div'>, keyof ArticleCardProps>) => {
  const { classes, cx } = useStyles()
  const theme = useMantineTheme()
  const linkProps = { target: '_blank', rel: 'noopener noreferrer' }

  return (
    <Card
      withBorder
      radius='md'
      className={cx(classes.card, className)}
      {...others}
    >
      <Card.Section>
        <NextLink href={link}>
          <a {...linkProps}>
            <Image
              src={image}
              alt='thumbnail'
              height={'25%'}
              width={'30%'}
              layout='responsive'
              objectFit='cover'
            />
          </a>
        </NextLink>
      </Card.Section>

      <Text className={classes.title} weight={500} component='a' {...linkProps}>
        {title}
      </Text>

      <Text size='sm' color='dimmed' lineClamp={4}>
        {description}
      </Text>

      <Group position='apart' className={classes.footer}>
        {/* <Text size='sm' inline>
          {author.name}
        </Text> */}
        <Text size='sm' inline>
          {format(parseISO(publishedAt), 'dd MMM yyyy ')}
        </Text>
      </Group>
    </Card>
  )
}
export default CardPost
