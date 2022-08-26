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
import { parseISO, format } from 'date-fns'

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
        <button
          className='rounded bg-blue-500 px-4 py-2 text-blue-50 hover:bg-blue-400'
          onClick={() => handleUpdate(product.id)}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          className='rounded bg-red-100 p-2 text-red-600 hover:bg-red-600
        hover:text-red-900'
          onClick={() => handleDelete(product.id)}
        >
          Delete
        </button>
      </td>
      <td>
        <p className='whitespace-nowrap'>
          {format(parseISO(product.createdAt), 'dd MMM yyyy')}
        </p>
      </td>
      <td>
        <p className='text-xl'>{product.title}</p>
        <p>
          <span className='font-bold'>Kategori: </span>
          {product.category}
        </p>
      </td>
      <td>{product.price}</td>
      <td>
        <NextLink href={`/${product.slug}`} passHref>
          <Anchor>Lihat Halaman</Anchor>
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
      <th>Aksi</th>
      <th>Dibuat</th>
      <th>Judul</th>
      <th>Harga</th>
      <th>Halaman</th>
      <th>Foto</th>
    </tr>
  )
  return (
    <AdminShell>
      <Group position='apart' mb={20}>
        <h1 className='text-5xl'>Produk</h1>
        <NextLink href='/admin/product/upload' passHref>
          <a className='rounded bg-blue-500 px-4 py-2 text-blue-50 hover:bg-blue-400'>
            Upload Produk
          </a>
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
