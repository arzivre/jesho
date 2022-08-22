import Main from 'components/Main'
import Image from 'next/image'
import NextLink from 'next/link'
import {
  Container,
  Grid,
  SimpleGrid,
  Group,
  Title,
  createStyles,
  Text,
  useMantineTheme,
  Box,
  Card,
} from '@mantine/core'
import CardPost from 'components/CardPost'
import { format, parseISO } from 'date-fns'
import { GetStaticProps } from 'next'
import { db } from 'libs/firebase-admin'
import { BlogProps } from 'libs/types'
import Meta from 'components/Meta'

export const getStaticProps: GetStaticProps = async () => {
  const snapshot = await db
    .collection('blogs')
    .orderBy('publishedAt', 'desc')
    .get()

  let blogs: any[] = []

  snapshot.forEach((doc: { id: any; data: () => any }) => {
    blogs.push({ id: doc.id, ...doc.data() })
  })

  return {
    props: { blogs },
    revalidate: 60,
  }
}

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: theme.fontSizes.xl * 4,
    margiin: 'auto',
    [theme.fn.smallerThan('xs')]: {
      fontSize: theme.fontSizes.xl* 2,
    },
  },
}))

const mockup = {
  image:
    'https://firebasestorage.googleapis.com/v0/b/jesho-store.appspot.com/o/products%2Fjesho%2Fa%20(1).jpg?alt=media&token=1749064b-0380-4421-92c9-0dfc2f1df887',
  link: 'https://mantine.dev/',
  title: 'Mockup tes',
  rating: 'outstanding',
  publishedAt: '2011-10-05T14:48:00.000Z',
  description:
    'Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very different direction to its predecessor, namely the fact that this time round instead of fighting against various mutated zombies, you’re now dealing with more occult enemies like werewolves and vampires.',
  author: {
    name: 'Bill Wormeater',
  },
}

interface Props {
  blogs: BlogProps[]
}
const Blog = ({ blogs }: Props) => {
  const { classes } = useStyles()

  return (
    <>
    <Meta />
    <Main>
      <Title align='center' order={1} className={classes.title}>
        Blog
      </Title>

      <Container my='md'>
        <Title align='left' order={2}>
          Semua Post
        </Title>
        {blogs.map((blog) => (
          <NextLink key={blog.slug} href={`/blog/${blog.slug}`} passHref>
            <Text component='a'>
              <Grid mt={20}>
                <Grid.Col xs={12} md={8}>
                  <Group direction='column'>
                    <Text size='sm' inline>
                      {format(parseISO(blog.publishedAt), 'dd MMM yyyy ')}
                    </Text>
                    <Title order={3}>{blog.title}</Title>
                    <Text lineClamp={2}>{blog.description}</Text>
                  </Group>
                </Grid.Col>
                <Grid.Col xs={12} md={4}>
                  {blog.cover && (
                    <Group position='center'>
                      <Image
                        src={blog.cover}
                        alt='preview'
                        width={200}
                        height={125}
                      />
                    </Group>
                  )}
                </Grid.Col>
              </Grid>
            </Text>
          </NextLink>
        ))}
      </Container>
    </Main>
    </>
  )
}
export default Blog
