import { GetStaticProps } from 'next'
import { ProductProps } from 'libs/types'

import { db } from 'libs/firebase-admin'
import useSWR, { SWRConfig } from 'swr'
import fetcher from 'utils/fetcher'

import AdminShell from 'components/Admin/AdminShell'

import { Suspense } from 'react'
import { Loading } from 'components/Loading'

import AdminTable from 'components/Admin/AdminTable'
import NextLink from 'next/link'
import { Anchor, Button, Image } from '@mantine/core'
import { useRouter } from 'next/router'
import post from 'utils/post'

export const getStaticProps: GetStaticProps = async (context) => {
  const snapshot = await db
    .collection('products')
    .orderBy('createdAt', 'desc')
    .get()

  let fallback: any[] = []

  snapshot.forEach((doc) => {
    fallback.push({ id: doc.id, ...doc.data() })
  })

  return {
    props: { fallback },
    revalidate: 60,
  }
}

interface Props {
  fallback: [ProductProps]
}

const Products = ({ fallback }: Props) => {
  const { data: products } = useSWR(`/api/product/action`, fetcher, {
    fallbackData: fallback,
    suspense: true,
  })
  const router = useRouter()

  const handleUpdate = async (id: string) => {
    router.push(`/admin/product/${id}`)
  }

  const handleDelete = async (id: string) => {
    await post('/api/product/action', id, 'DELETE')
  }

  const rows = products.map((product: ProductProps) => (
    <tr key={product.id}>
      <td>
        <Button onClick={() => handleUpdate(product.slug)}>Edit</Button>
        <Button color='red' onClick={() => handleDelete(product.slug)}>
          Delete
        </Button>
      </td>
      <td>{product.id}</td>
      <td>{product.title}</td>
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
          width='100px'
          height='140px'
        />
      </td>
    </tr>
  ))
  const headers = (
    <tr>
      <th>Action</th>
      <th>Id</th>
      <th>Title</th>
      <th>Price</th>
      <th>Description</th>
      <th>Image</th>
    </tr>
  )

  return (
    <AdminShell>
      <Suspense fallback={<Loading />}>
        <AdminTable headers={headers} rows={rows} />
      </Suspense>
    </AdminShell>
  )
}
export default Products
