import { Suspense } from 'react'
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
    // TODO: replace with slug for seo
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const params = context.params! // ! is a non-null assertion
  const doc = await db.collection('products').doc(params.id).get()
  const product = { id: doc.id, ...doc.data() }
  return {
    props: { product, id: params.id },
    revalidate: 60,
  }
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  let { cart, removeItem, addItem, increaseItem, decreaseItem,  } =
    useCart()
  const inCart = isInCart(cart, product)
  
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
              <hr />
              <Group position='apart' grow>
                {!inCart && (
                  <Button onClick={() => addItem(product)}>Add</Button>
                )}
                {inCart && (
                  <Button onClick={() => increaseItem(product.id)}>+</Button>
                )}
                {inCart?.quantity > 1 && (
                  <Button onClick={() => decreaseItem(product.id)}>-</Button>
                )}
                {inCart?.quantity === 1 && (
                  <Button onClick={() => removeItem(product.id)}>Remove</Button>
                )}
              </Group>
            </Grid.Col>
            <Suspense fallback={<Loading />}>
              <Grid.Col
                xs={12}
                md={6}
                style={{ height: '390px', width: '360px' }}
              >
                <Image
                  src={product.imgUrl}
                  alt={product.title}
                  height={'90%'}
                  width={'60%'}
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
