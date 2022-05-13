import Main from 'components/Main'
import Image from 'next/image'

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
} from '@mantine/core'
import CardPost from 'components/CardPost'
import { format, parseISO } from 'date-fns'
import { GetStaticProps } from 'next'
import { db } from 'libs/firebase-admin'
import { BlogProps } from 'libs/types'

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
      fontSize: theme.fontSizes.md,
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
    <Main>
      <Container size='xl'>
        <Group position='left'>
          <Title order={1} className={classes.title}>
            Postingan unggulan
          </Title>
        </Group>
      </Container>

      <Container my='md'>
        <SimpleGrid
          cols={3}
          spacing='md'
          mt={50}
          breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
        >
          <CardPost {...mockup} />
          <CardPost {...mockup} />
          <CardPost {...mockup} />
        </SimpleGrid>

        <Grid mt={100}>
          {/* <Grid.Col
            xs={12}
            md={4}
            style={{
              height: '200px',
              width: '400px',
            }}
          >
            <Image
              src={mockup.image}
              alt='thumbnail'
              height={'50%'}
              width={'100%'}
              layout='responsive'
              objectFit='cover'
            />
          </Grid.Col> */}

          <Grid.Col xs={12} md={8}>
            {blogs.map((blog) => (
              <Box key={blog.slug}>
                <Title order={3}>{blog.title}</Title>
                <Group position='apart'>
                  {/* <Text color={'gray'}>{blog.author.name}</Text> */}
                  <Text size='sm' inline>
                    {format(parseISO(blog.publishedAt), 'dd MMM yyyy ')}
                  </Text>
                </Group>
                <Text lineClamp={2}>{blog.description}</Text>
              </Box>
            ))}
          </Grid.Col>
        </Grid>
      </Container>
    </Main>
  )
}
export default Blog
