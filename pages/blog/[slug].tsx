import { Container, createStyles, Title } from '@mantine/core'
import Main from 'components/Main'
import { db } from 'libs/firebase-admin'
import { BlogProps } from 'libs/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

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

  return (
    <Main>
      <Container>
        <Title align='center' my={50} className={classes.title}>
          {blog.title}
        </Title>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </Container>
    </Main>
  )
}
export default BlogDetail
