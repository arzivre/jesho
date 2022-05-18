import { Button , Title } from '@mantine/core'
import AdminShell from 'components/Admin/AdminShell'
import { Loading } from 'components/Loading'
import { db } from 'libs/firebase-admin'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Suspense, useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import fetcher from 'utils/fetcher'
import post from 'utils/post'
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
    return
  }

  const handleDelete = async (id: string) => {
    const ok = confirm('Are you sure you want to delete this order?')
    if (ok) {
      setLoading(true)
      await post('/api/order/v1', id, 'DELETE')
      mutate('/api/order/v1')
      setLoading(false)
    }
    return
  }

  const rows = orders.map((order: any) => (
    <tr key={order.id}>
      <td>
        <Button color={`${order.status === 'PENDING' ? 'black' : 'lime'}`}>
          {order.status}
        </Button>
      </td>
      <td>{format(parseISO(order.createdAt), 'dd MMM yyyy - H:mm')}</td>
      <td>{format(parseISO(order.expiration_date), 'dd MMM yyyy - H:mm')}</td>
      <td>{order.name}</td>
      <td>Rp {order.items.total}</td>
      <td>
        <Button
          onClick={() => handleUpdate(order.external_id)}
          sx={{ margin: 'auto' }}
        >
          Edit
        </Button>
      </td>
      <td>
        <Button color='red' onClick={() => handleDelete(order.id)}>
          Delete
        </Button>
      </td>
    </tr>
  ))
  const headers = (
    <tr>
      <th>Status Pembayaran</th>
      <th>tgl dibuat</th>
      <th>tgl kadaluarsa</th>
      <th>Nama</th>
      <th>Total</th>
      <th>Update</th>
      <th>Action</th>
    </tr>
  )

  return (
    <AdminShell>
      <Title>Orders</Title>
      {loading && <Loading />}
      <Suspense fallback={<Loading />}>
        <AdminTable headers={headers} rows={rows} />
      </Suspense>
    </AdminShell>
  )
}
export default AdminOrder
