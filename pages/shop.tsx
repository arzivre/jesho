import {
  Box,
  Container,
  Group,
  Loader,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import Main from 'components/Main'
import { db } from 'libs/firebase-admin'
import { ProductProps } from 'libs/types'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import NextLink from 'next/link'
import { Suspense } from 'react'

export const getStaticProps: GetStaticProps = async (context) => {
  const snapshot = await db
    .collection('products')
    .orderBy('createdAt', 'desc')
    .get()

  let products: any[] = []

  snapshot.forEach((doc: { id: any; data: () => any }) => {
    products.push({ id: doc.id, ...doc.data() })
  })

  return {
    props: { products },
    revalidate: 60,
  }
}

interface Props {
  products: [ProductProps]
}
const Shop = ({ products }: Props) => {
  const theme = useMantineTheme()

  return (
    <>
      <Head>
        <title>Shop - Jesho</title>
      </Head>
      <Main>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.yellow[0],
          })}
        >
          <Container size='xl'>
            <Title
              align='center'
              order={1}
              sx={(theme) => ({
                fontSize: theme.fontSizes.xl * 3,
                fontFamily: 'Varela Round, sans-serif',
                fontWeight: 100,
              })}
            >
              SHOP
            </Title>

            <Suspense fallback={<Loader />}>
              <Group
                direction='row'
                position='center'
                spacing='xl'
                grow
                py={20}
              >
                {products.map((product: ProductProps) => (
                  <NextLink key={product.id} href={`/${product.slug}`} passHref>
                    <Text component='a'>
                      <div>
                        <div
                          style={{
                            margin: 'auto',
                            height: '400px',
                            minWidth: '350px',
                          }}
                        >
                          <Image
                            src={product.imgUrl}
                            alt='Banner'
                            height={'80%'}
                            width={'80%'}
                            layout='responsive'
                            objectFit='contain'
                            priority
                          />
                        </div>
                        <Group
                          direction='column'
                          style={{
                            marginBottom: 5,
                            marginTop: theme.spacing.sm,
                          }}
                        >
                          <Text>{product.title}</Text>
                          <Text size='md' weight={700}>
                            Rp {product.price}
                          </Text>
                        </Group>
                      </div>
                    </Text>
                  </NextLink>
                ))}
              </Group>
            </Suspense>
          </Container>
        </Box>
      </Main>
    </>
  )
}
export default Shop
