import { Suspense, useEffect } from 'react'
import { ParsedUrlQuery } from 'querystring'
import { GetStaticPaths, GetStaticProps } from 'next'

import { ProductProps } from 'libs/types'
import { db } from 'libs/firebase-admin'

import Main from 'components/Main'
import { Loading, LoadingFullScreen } from 'components/Loading'

import {
  Grid,
  Group,
  Image,
  Container,
  Title,
  Text,
  Button,
} from '@mantine/core'
import useCart from 'hooks/useCart'
import isInCart from 'utils/isInCart'
import { BsFillTrashFill } from 'react-icons/bs'

type Props = {
  product: any
}
interface Params extends ParsedUrlQuery {
  slug: string
}
interface ProductDetailsProps {
  product: ProductProps
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ref = await db.collection('products').get()
  const paths = ref.docs.map((doc) => {
    return {
      params: { slug: doc.data().slug },
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

  const query = await db
    .collection('products')
    .where('slug', '==', params.slug)
    .get()

  let data = query.docs[0].data()

  return {
    props: { product: data },
    revalidate: 60,
  }
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  let { cart, removeItem, addItem, increaseItem, decreaseItem } = useCart()
  const inCart = isInCart(cart, product)

  return (
    <Main>
      <Suspense fallback={<LoadingFullScreen />}>
        <Container size='xl'>
          <Grid mt={50}>
            <Suspense fallback={<Loading />}>
              <Grid.Col xs={12} md={6}>
                <Group position='center' mb={20}>
                  <div style={{ height: '400px', width: '400px' }}>
                    <Image
                      src={product.imgUrl}
                      alt={product.title}
                      height={'100%'}
                      width={'100%'}
                    />
                  </div>
                </Group>
                <Group position='apart' grow>
                  {!inCart && (
                    <Button mx={20} onClick={() => addItem(product)}>
                      Add{' '}
                    </Button>
                  )}
                  {inCart && (
                    <Button
                      mx={20}
                      onClick={() => increaseItem(product.productId)}
                    >
                      +
                    </Button>
                  )}
                  {inCart.quantity > 1 && (
                    <Button
                      mx={20}
                      onClick={() => decreaseItem(product.productId)}
                    >
                      -
                    </Button>
                  )}
                  {inCart.quantity === 1 && (
                    <Button
                      mx={20}
                      onClick={() => removeItem(product.productId)}
                    >
                      <BsFillTrashFill />
                    </Button>
                  )}
                </Group>
              </Grid.Col>
            </Suspense>
            <Grid.Col xs={12} md={6}>
              <Title order={1} mb={20}>
                {product.title}
              </Title>
              <Text size='xl'>Rp {product.price}</Text>
              <hr />
              {product.description ? (
                <Text>{product.description}</Text>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: product.content }} />
              )}
            </Grid.Col>
          </Grid>
        </Container>
      </Suspense>
    </Main>
  )
}
export default ProductDetails
