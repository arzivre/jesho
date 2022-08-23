import { GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'

import { db } from 'libs/firebase-admin'
import { ParsedUrlQuery } from 'querystring'

import { Loading } from 'components/Loading'
import Main from 'components/Main'
import { Container, createStyles, Group, Text, Title, Box } from '@mantine/core'
import { BlogProps } from 'libs/types'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import Meta from 'components/Meta'

const RichTextEditor = dynamic(() => import('@mantine/rte'), {
  ssr: false,
  loading: () => <Loading />,
})

type Props = {
  blog: any
}
interface Params extends ParsedUrlQuery {
  id: string
  slug: string
}
interface BlogDetailsProps {
  blog: BlogProps
}
export const getStaticPaths: GetStaticPaths = async () => {
  const ref = await db.collection('blogs').get()

  const paths = ref.docs.map((doc) => {
    return {
      params: { slug: doc.id },
    }
  })

  return {
    //* must be in this format => paths: [{ params: { id}}],
    // TODO: replace with slug for seo
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const params = context.params! // ! is a non-null assertion
  const doc = await db.collection('blogs').doc(params.slug).get()

  return {
    props: { blog: doc.data() },
    revalidate: 60,
  }
}

const useStyles = createStyles((theme) => ({
  root: {
    background: theme.colors.gray[2],
  },
  image: {
    maxWidth: '100%',
    maxHeight: '400px',
    margin: '0 auto',
  },
  content: {
    background: theme.colors.gray[2],
    border: 0,
    padding: 0,
  },
}))

const BlogDetail = ({ blog }: BlogDetailsProps) => {
  const { classes } = useStyles()
  const [content, onChange] = useState(blog.content)

  return (
    <>
      <Meta />
      <Main>
        <Box className={classes.root}>
          <Container className='py-10'>
            <Text size='sm' inline>
              {format(parseISO(blog.publishedAt), 'dd MMM yyyy')}
            </Text>
            <Title order={1}>{blog.title}</Title>
            {blog.cover && (
              <Group position='center' className={classes.image}>
                <Image
                  src={blog.cover}
                  alt={blog.title}
                  height={400}
                  width={930}
                  layout='fixed'
                />
              </Group>
            )}
            <RichTextEditor
              value={content}
              onChange={onChange}
              readOnly
              mt={20}
              className={classes.content}
            />
          </Container>
        </Box>
      </Main>
    </>
  )
}
export default BlogDetail
