import { GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'

import { db } from 'libs/firebase-admin'
import { ParsedUrlQuery } from 'querystring'

import { Loading } from 'components/Loading'
import Main from 'components/Main'
import { Container, createStyles, Group, Text, Title } from '@mantine/core'
import { BlogProps } from 'libs/types'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'

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
  title: {
    fontSize: theme.fontSizes.xl * 3,
  },
  [theme.fn.smallerThan('md')]: {
    fontSize: theme.fontSizes.md,
  },
}))

const BlogDetail = ({ blog }: BlogDetailsProps) => {
  const { classes } = useStyles()
  const [content, onChange] = useState(blog.content)

  return (
    <Main>
      <Container>
        {blog.cover && (
          <Group position='center' mt={20}>
            <div>
              <Image
                src={blog.cover}
                alt={blog.title}
                height={400}
                width={900}
              />
            </div>
          </Group>
        )}
        <Text size='sm' inline my={20}>
          {format(parseISO(blog.publishedAt), 'dd MMM yyyy')}
        </Text>
        <Title align='center' mb={50} className={classes.title}>
          {blog.title}
        </Title>
        <RichTextEditor
          value={content}
          onChange={onChange}
          readOnly
          style={{
            border: 0,
          }}
        />
      </Container>
    </Main>
  )
}
export default BlogDetail
