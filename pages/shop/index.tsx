import {
  Box,
  Button,
  Card,
  Container,
  createStyles,
  Group,
  Loader,
  ScrollArea,
  Text,
  Title,
} from '@mantine/core'
import Category from 'components/Category'
import { Loading } from 'components/Loading'
import Main from 'components/Main'
import { db } from 'libs/firebase-admin'
import { CategoryProps, ProductProps } from 'libs/types'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import NextLink from 'next/link'
import { Suspense } from 'react'

export const getStaticProps: GetStaticProps = async (context) => {
  const snapshotProducts = await db
    .collection('products')
    .orderBy('createdAt', 'desc')
    .get()

  const snapshotCategories = await db
    .collection('category')
    .where('type', '==', 'product')
    .get()

  let products: any[] = []
  let categories: any[] = []

  snapshotProducts.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() })
  })
  snapshotCategories.forEach((doc) => {
    categories.push({ ...doc.data() })
  })

  return {
    props: { products, categories },
    revalidate: 60,
  }
}

const useStyles = createStyles((theme) => ({
  root: {
    position: 'sticky',
    top: 56,
    zIndex: 1,
  },
  card: {
    WebkitBackdropFilter: 'blur(8px)', // Safari
    backdropFilter: 'blur(8px)', // Chrome, Firefox
    boxShadow: ' 0px 10px 15px 10px rgb(0 0 0 / 1%)',
    backgroundColor: 'rgb(206 212 218 / 15%)',
  },
  main: {
    overflowX: 'hidden',
    maxWidth: '1000px',
  },
  header: {
    fontSize: theme.fontSizes.xl * 1.5,
    [theme.fn.largerThan('md')]: {
      fontSize: theme.fontSizes.xl * 2,
    },
  },
  category: {},
}))

interface Props {
  products: [ProductProps]
  categories: [CategoryProps]
}
const ShopPage = ({ products, categories }: Props) => {
  const { theme } = useStyles()

  return (
    <>
      <Head>
        <title>Shop - Jesho</title>
      </Head>

      <Main>
        <Box sx={{ backgroundColor: '#E9ECEF' }}>
          <Suspense fallback={<Loading />}>
            <Category categories={categories} />
          </Suspense>

          <Suspense fallback={<Loading />}>
            <Container size='xl'>
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
                      <Card
                        sx={(theme) => ({
                          backgroundColor: theme.colors.gray[0],
                        })}
                      >
                        <Card.Section
                          style={{
                            margin: 'auto',
                            maxWidth: '300px',
                            maxHeight: '400px',
                          }}
                        >
                          <Image
                            src={product.imgUrl}
                            alt='Banner'
                            height={300}
                            width={300}
                            layout='responsive'
                            objectFit='contain'
                            priority
                          />
                          <Group
                            direction='column'
                            style={{
                              marginBottom: 5,
                              marginTop: theme.spacing.sm,
                            }}
                          >
                            <Text lineClamp={1}>{product.title}</Text>
                            <Text size='md' weight={700}>
                              Rp {product.price}
                            </Text>
                          </Group>
                        </Card.Section>
                      </Card>
                    </Text>
                  </NextLink>
                ))}
              </Group>
            </Container>
          </Suspense>
        </Box>
      </Main>
    </>
  )
}
export default ShopPage
