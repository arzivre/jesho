import { Group, Text, Title } from '@mantine/core'
import AdminShell from 'components/Admin/AdminShell'
import { Loading } from 'components/Loading'
import { format, parseISO } from 'date-fns'
import { OrderDetailProps } from 'libs/types'
import { useRouter } from 'next/router'
import { Suspense } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import fetcher from 'utils/fetcher'
import post from 'utils/post'

const OrderUpdate = () => {
  const router = useRouter()
  const { id } = router.query
  const { mutate } = useSWRConfig()
  const { data: order, error } = useSWR(`/api/order/${id}`, fetcher, {
    suspense: true,
  })
  const {
    alamat,
    detail_alamat,
    kode_pos,
    kota,
    nama_belakang,
    nama_depan,
    negara,
    phone,
    provinsi,
  } = order.shippingAddress
  const status =
    order.status === 'PENDING' ? (
      <Title>Pending</Title>
    ) : (
      <Title>{order.status}</Title>
    )
  const pengiriman =
    order.statusDelivery === 'PENDING' ? (
      null
    ) : (
      <Title>{order.statusDelivery}</Title>
    ) 
      
  const details = (
    <>
      <Group grow>
        <Group direction='column'>
          <Text>
            Tgl Dibuat:
            {format(parseISO(order.createdAt), ' dd MMM yyyy - H:mm')}
          </Text>
          <Group position='left'>
            <Text>Tgl Kadaluarsa:</Text>
            <Text color='red'>
              {format(parseISO(order.expiration_date), ' dd MMM yyyy - H:mm')}
            </Text>
          </Group>
        </Group>
        <Group direction='column'>
          <Text>Id: {order.external_id}</Text>
          <Text>
            account_number: {order.account_number} - Via Bank {order.bank_code}
          </Text>
        </Group>
      </Group>
      <hr />
      <Group grow my={10}>
        <Group spacing={0}>
          <Text>Status: {order.status}</Text>
          <Text>Status Pengiriman: {order.statusDelivery}</Text>
        </Group>
        <Text>Total: Rp {order.items.total}</Text>
        <Text>Nama: {order.name}</Text>
        <Text>Email: {order.email}</Text>
      </Group>
      <hr />
      <Title order={3}>Alamat Pengiriman</Title>
      <Group grow my={10}>
        <Text>
          Nama Penerima: {nama_depan} {nama_belakang}{' '}
        </Text>
        <Text>Phone: {phone}</Text>
      </Group>
      <Text>
        Provinsi: {provinsi},
        <hr />
        Kota: {kota}
        <hr />
        {alamat},{detail_alamat}
        <hr />
        Kode pos: {kode_pos}
      </Text>
    </>
  )

  const handleSubmit = async (data: any) => {
    await post(`/admin/order/${id}`, data, 'PUT')
    mutate(`/api/order/${id}`, data, false)
  }

  return (
    <AdminShell>
      <Group position='center' mb={20}>
        <Title>Order Details</Title>
        <Suspense fallback={<Loading />}>
          {status}
        </Suspense>
        <Suspense fallback={<Loading />}>
          {pengiriman}
        </Suspense>
      </Group>
      <Suspense fallback={<Loading />}>{details}</Suspense>
    </AdminShell>
  )
}
export default OrderUpdate
