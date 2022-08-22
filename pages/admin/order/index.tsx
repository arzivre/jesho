import { Button, Title } from '@mantine/core'
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
        <button
          className={`rounded p-2 text-gray-50 ${
            order.status === 'PENDING' ? 'bg-gray-500' : 'bg-lime-500'
          }`}
        >
          {order.status}
        </button>
      </td>
      <td>
        <button
          className={`rounded p-2 text-gray-50 ${
            order.status === 'PENDING' ? 'bg-gray-500' : 'bg-violet-500'
          }`}
        >
          {order.statusDelivery}
        </button>
      </td>
      <td>{format(parseISO(order.createdAt), 'dd MMM yyyy - H:mm')}</td>
      <td>{format(parseISO(order.expiration_date), 'dd MMM yyyy - H:mm')}</td>
      <td>{order.name}</td>
      <td>Rp {order.items.total}</td>
      <td>
        <button
          onClick={() => handleUpdate(order.external_id)}
          className='rounded bg-blue-500 px-4 py-2 text-blue-50 hover:bg-blue-400'
        >
          Edit
        </button>
      </td>
      <td>
        <button
          className='rounded bg-red-100 p-2 text-red-600 hover:bg-red-600 hover:text-red-900'
          onClick={() => handleDelete(order.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))
  const headers = (
    <tr>
      <th>Status Pembayaran</th>
      <th>Pengiriman</th>
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
