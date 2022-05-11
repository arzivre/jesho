import Main from 'components/Main'

import {
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
  Group,
  Title,
  createStyles,
  Text,
} from '@mantine/core'
import CardPost from 'components/CardPost'
import Image from 'next/image'

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
  title: 'Resident Evil Village review',
  rating: 'outstanding',
  description:
    'Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very different direction to its predecessor, namely the fact that this time round instead of fighting against various mutated zombies, you’re now dealing with more occult enemies like werewolves and vampires.',
  author: {
    name: 'Bill Wormeater',
  },
}

const Blog = () => {
  const theme = useMantineTheme()

  return (
    <Main>
      <Container size='xl' my='xl'>
        <Group position='left'>
          <Title
            order={1}
            sx={(theme) => ({
              fontSize: theme.fontSizes.xl * 4,
            })}
          >
            Postingan unggulan
          </Title>
        </Group>
      </Container>

      <Container my='md'>
        <SimpleGrid
          cols={3}
          spacing='md'
          my='xl'
          breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
        >
          <CardPost {...mockup} />
          <CardPost {...mockup} />
          <CardPost {...mockup} />
        </SimpleGrid>

        <Grid my='xl'>
          <Grid.Col
            span={4}
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
          </Grid.Col>

          <Grid.Col span={8}>
            <Text size='md'></Text>
            <Text weight={500} size='xl' color={'#087F5B'}>
              {mockup.title}
            </Text>
            <Text color={'gray'}>{mockup.author.name}</Text>
            <Text lineClamp={2}>{mockup.description}</Text>
          </Grid.Col>
        </Grid>
      </Container>
    </Main>
  )
}
export default Blog
