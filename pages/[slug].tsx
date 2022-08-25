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
  Card,
  Box,
} from '@mantine/core'
import useCart from 'hooks/useCart'
import isInCart from 'utils/isInCart'
import { BsFillTrashFill } from 'react-icons/bs'
import Meta from 'components/Meta'

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
    <>
      <Meta title={`${product.title} - Jesho`} />
      <Main>
        <Box
          style={{
            background: '#F8F9FA',
          }}
        >
          <Suspense fallback={<LoadingFullScreen />}>
            <Container size='xl'>
              <Grid gutter='xl'>
                <Suspense fallback={<Loading />}>
                  <Grid.Col xs={12} md={6} mt={20}>
                    <Card
                      style={{
                        backgroundColor: 'rgb(206 212 218 / 25%)',
                      }}
                    >
                      <div className='flex flex-col'>
                        <div className='mb-4'>
                          <Image
                            src={product.imgUrl}
                            alt={product.title}
                            height={'100%'}
                            width={'100%'}
                          />
                        </div>
                        <ol className='flex justify-between'>
                          <li>
                            <a
                              href='https://shopee.co.id/jeshoid'
                              target='_blank'
                              rel='noopener noreferrer'
                              className='rounded bg-orange-500 px-5 py-2 text-orange-50 hover:bg-orange-400'
                              >
                              Beli di Shopee
                            </a>
                          </li>
                          <li>
                            <a
                              href='https://www.tokopedia.com/houseofjesho'
                              target='_blank'
                              rel='noopener noreferrer'
                              className='rounded bg-green-500 px-5 py-2 text-green-50 hover:bg-green-400'
                            >
                              Beli di Tokopedia
                            </a>
                          </li>
                        </ol>
                      </div>
                    </Card>
                  </Grid.Col>
                </Suspense>
                <Grid.Col xs={12} md={6} mt={20}>
                  <Title order={1} mb={20}>
                    {product.title}
                  </Title>
                  <Text size='xl'>Rp {product.price}</Text>
                  <hr />
                  <Text>
                    <div
                      dangerouslySetInnerHTML={{ __html: product.content }}
                    />
                  </Text>
                </Grid.Col>
              </Grid>
            </Container>
          </Suspense>
        </Box>
      </Main>
    </>
  )
}
export default ProductDetails
