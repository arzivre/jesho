import {
  Box,
  Container,
  Group,
  Image,
  Loader,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import Main from 'components/Main'
import { db } from 'libs/firebase-admin'
import { ProductProps } from 'libs/types'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
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

const Category = dynamic(() => import('components/Category'), {
  suspense: true,
})
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
            margin: 0,
            backgroundColor: theme.colors.yellow[0],
          })}
        >
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
            <Group direction='row' position='center' grow py={20}>
              {products.map((product: ProductProps) => (
                <NextLink key={product.id} href={`/${product.slug}`} passHref>
                  <Text component='a'>
                    <div>
                      <Image
                        src={product.imgUrl}
                        alt='Banner'
                        height='400px'
                        width='400px'
                      />
                      <Group
                        direction='column'
                        style={{
                          marginBottom: 5,
                          marginTop: theme.spacing.sm,
                        }}
                      >
                        <Text>{product.title}</Text>
                        <Text size='md' weight={700}>
                          Rp 100000
                        </Text>
                      </Group>
                    </div>
                  </Text>
                </NextLink>
              ))}
            </Group>
          </Suspense>
        </Box>
      </Main>
    </>
  )
}
export default Shop
