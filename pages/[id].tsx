import { Suspense } from 'react'
import { ParsedUrlQuery } from 'querystring'
import { GetStaticPaths, GetStaticProps } from 'next'

import { ProductProps } from 'libs/types'
import { db } from 'libs/firebase-admin'

import Main from 'components/Main'
import { Loading, LoadingFullScreen } from 'components/Loading'

import { Grid, Group, Image, Container, Title, Text } from '@mantine/core'

type Props = {
  product: any
}
interface Params extends ParsedUrlQuery {
  id: string
}
interface ProductDetailsProps {
  product: ProductProps
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ref = await db.collection('products').get()
  const paths = ref.docs.map((doc) => {
    return {
      params: { id: doc.id },
    }
  })
  return {
    //* must be in this format => paths: [{ params: { id}}],
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const params = context.params! // ! is a non-null assertion
  const doc = await db.collection('products').doc(params.id).get()
  const product = doc.data()
  return {
    props: { product },
    revalidate: 60,
  }
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <Main>
      <Suspense fallback={<LoadingFullScreen />}>
        <Container size='xl'>
          <Grid mt={50}>
            <Grid.Col xs={12} md={6}>
              <Title order={1} mb={20}>
                {product.title}
              </Title>
              <Text>Rp {product.price}</Text>
              <Text>{product.description}</Text>
            </Grid.Col>
            <Suspense fallback={<Loading />}>
              <Grid.Col xs={12} md={6}>
                <Image
                  src={product.imgUrl}
                  alt={product.title}
                  width='600px'
                  height='540px'
                />
              </Grid.Col>
            </Suspense>
          </Grid>
        </Container>
      </Suspense>
    </Main>
  )
}
export default ProductDetails
