import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { db } from 'libs/firebase-admin'
import { Key, Suspense } from 'react'
import { compareDesc, parseISO } from 'date-fns'

import Head from 'next/head'
import dynamic from 'next/dynamic'

import Main from 'components/Main'
import {
  Card,
  Center,
  Container,
  Grid,
  Group,
  Image,
  Loader,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { ProductProps } from 'libs/types'

export const getStaticProps: GetStaticProps = async (context) => {
  const snapshot = await db.collection('products').get()

  let products: any[] = []
  snapshot.forEach((doc: { id: any; data: () => any }) => {
    products.push({ id: doc.id, ...doc.data() })
  })
  products.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  )

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
        <Container my={50}>
          <Center>
            <Title
              order={1}
              sx={(theme) => ({
                fontSize: theme.fontSizes.xl * 3,
              })}
            >
              SHOP
            </Title>
          </Center>
          <Grid>
            <Grid.Col xs={12} md={3}>
              <Suspense fallback={<Loader />}>
                <Category />
              </Suspense>
            </Grid.Col>
            <Grid.Col xs={12} md={9}>
              <Suspense fallback={<Loader />}>
                <Group direction='row'>
                  {!products && <p>No Product</p>}
                  {products.map((product: ProductProps) => (
                    <Card
                      key={product.id}
                      style={{ margin: 'auto', background: 'white' }}
                    >
                      <Image
                        src={product.imgUrl}
                        alt='Banner'
                        height='300px'
                        width='300px'
                      />
                      <Group
                        position='apart'
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
                    </Card>
                  ))}
                </Group>
              </Suspense>
            </Grid.Col>
          </Grid>
        </Container>
      </Main>
    </>
  )
}
export default Shop
