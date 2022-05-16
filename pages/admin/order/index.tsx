import { Anchor, Button, Title } from '@mantine/core'
import AdminShell from 'components/Admin/AdminShell'
import { Loading } from 'components/Loading'
import { db } from 'libs/firebase-admin'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Suspense, useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import fetcher from 'utils/fetcher'
import post from 'utils/post'
import NextLink from 'next/link'
import AdminTable from 'components/Admin/AdminTable'
import { format, parseISO } from 'date-fns'

export const getStaticProps: GetStaticProps = async (context) => {
  const snapshot = await db
    .collection('orders')
    .orderBy('createdAt', 'desc')
    .limit(10)
    .get()

  let orders: any[] = []

  snapshot.forEach((doc) => {
    orders.push({ id: doc.id, ...doc.data() })
  })

  return {
    props: { fallback: orders },
    revalidate: 60,
  }
}

// TODO: infer propsype
const AdminOrder = (fallback: any) => {
  const { mutate } = useSWRConfig()
  const { data: orders } = useSWR(`/api/order/v1`, fetcher, {
    fallback: fallback,
    suspense: true,
  })

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleUpdate = async (id: string) => {
    router.push(`/admin/order/${id}`)
  }

  const handleDelete = async (id: string) => {
    setLoading(true)
    await post('/api/order/v1', id, 'DELETE')
    mutate('/api/order/v1')
    setLoading(false)
  }

  const rows = orders.map((order: any) => (
    <tr key={order.id}>
      <td>
        <Button onClick={() => handleUpdate(order.external_id)}>Edit</Button>
        <Button color='red' onClick={() => handleDelete(order.id)}>
          {loading ? 'Loading...' : 'Delete'}
        </Button>
      </td>
      <td>{order.status}</td>
      <td>{format(parseISO(order.createdAt), 'dd MMM yyyy - H:mm')}</td>
      <td>{order.name}</td>
      <td>{order.items.total}</td>
      <td>
        <NextLink href={`/admin/order/${order.external_id}`} passHref>
          <Anchor>Detail orders</Anchor>
        </NextLink>
      </td>
    </tr>
  ))
  const headers = (
    <tr>
      <th>Action</th>
      <th>Status</th>
      <th>Tgl</th>
      <th>Nama</th>
      <th>Total</th>
      <th>Detail</th>
    </tr>
  )

  return (
    <AdminShell>
      <Title>Orders</Title>
      <Suspense fallback={<Loading />}>
        <AdminTable headers={headers} rows={rows} />
      </Suspense>
    </AdminShell>
  )
}
export default AdminOrder
