import { GetStaticProps } from 'next'
import { ProductProps } from 'libs/types'

import { db } from 'libs/firebase-admin'
import useSWR, { SWRConfig, useSWRConfig } from 'swr'
import fetcher from 'utils/fetcher'

import AdminShell from 'components/Admin/AdminShell'

import { Suspense, useState } from 'react'
import { Loading } from 'components/Loading'

import AdminTable from 'components/Admin/AdminTable'
import NextLink from 'next/link'
import { Anchor, Button, Group, Image, Text, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import post from 'utils/post'

export const getStaticProps: GetStaticProps = async (context) => {
  const snapshot = await db
    .collection('products')
    .orderBy('createdAt', 'desc')
    .get()

  let products: any[] = []

  snapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() })
  })

  return {
    props: { fallback: products },
    revalidate: 60,
  }
}

interface Props {
  fallback: [ProductProps]
}

const Products = ({ fallback }: Props) => {
  const { mutate } = useSWRConfig()
  const { data: products, error } = useSWR('/api/product/action', fetcher, {
    fallbackData: fallback,
    suspense: true,
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleUpdate = async (id: string) => {
    router.push(`/admin/product/${id}`)
  }

  const handleDelete = async (id: string) => {
    setLoading(true)
    await post('/api/product/action', id, 'DELETE')
    mutate('/api/product/action')
    setLoading(false)
  }

  const rows = products.map((product: ProductProps) => (
    <tr key={product.id}>
      <td>
        <Button onClick={() => handleUpdate(product.id)}>Edit</Button>
      </td>
      <td>
        <Button color='red' onClick={() => handleDelete(product.id)}>
          Delete
        </Button>
      </td>
      <td>{product.id}</td>
      <td>{product.createdAt}</td>
      <td>{product.price}</td>
      <td>
        <NextLink href={`/${product.slug}`} passHref>
          <Anchor>Check Page</Anchor>
        </NextLink>
      </td>
      <td>
        <Image
          src={product.imgUrl}
          alt={product.title}
          width='150px'
          height='150px'
        />
      </td>
    </tr>
  ))
  const headers = (
    <tr>
      <th>Update</th>
      <th>Action</th>
      <th>Dibuat</th>
      <th>Title</th>
      <th>Price</th>
      <th>Description</th>
      <th>Image</th>
    </tr>
  )
  return (
    <AdminShell>
      <Group position='apart' mb={20}>
        <Title>Products</Title>
        <NextLink href='/admin/product/upload' passHref>
          <Button component='a'>Upload a Product</Button>
        </NextLink>
      </Group>
      {loading && <Loading />}
      <Suspense fallback={<Loading />}>
        <AdminTable headers={headers} rows={rows} />
      </Suspense>
    </AdminShell>
  )
}
export default Products
