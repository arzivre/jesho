import { Button, Group, Image, Text, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import AdminShell from 'components/Admin/AdminShell'
import { Loading } from 'components/Loading'
import { format, parseISO } from 'date-fns'
import { ProductProps } from 'libs/types'
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

  const form = useForm({
    initialValues: {
      resi: '',
    },
  })

  const details = (
    <>
      <Group grow>
        <Group>
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
        <Group >
          <Text>Id: {order.external_id}</Text>
          <Text>
            account_number: {order.account_number} - Via Bank {order.bank_code}
          </Text>
        </Group>
      </Group>
      <hr />
      <Text weight='bold' align='left'>
        STATUS
      </Text>
      <Group grow my={10}>
        <Group spacing={0}>
          <Text>Pembayaran: {order.status}</Text>
          <Text>
            Pengiriman:{' '}
            {order.codeDelivery === 'PENDING'
              ? 'MASUKAN RESI'
              : order.codeDelivery}{' '}
            - {order.statusDelivery}
          </Text>
        </Group>
        <Text>Nama: {order.name}</Text>
        <Text>Email: {order.email}</Text>
      </Group>
      <hr />
      <Text>Total: Rp {order.items.total}</Text>
      <hr />
      <Title order={3} align='center'>
        Alamat Pengiriman
      </Title>
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
      <hr />
      <Title order={3} align='center' mb={20}>
        Barang dibeli
      </Title>

      <Group>
        {order.items.cart.map((item: ProductProps) => (
          <Group key={item.productId} style={{ border: '2px solid black' }}>
            <Group>
              <Text align='center'>{item.title}</Text>
              <Text align='center'>
                {item.quantity} x Rp {item.price} = Rp{' '}
                {Number(item.price) * Number(item.quantity)}
              </Text>
            </Group>
            <Image
              src={item.imgUrl}
              alt={item.title}
              height='200px'
              width='200px'
            />
          </Group>
        ))}
      </Group>
      <Group position='center' my={20}>
        <Text>Total: Rp {order.items.total}</Text>
      </Group>
    </>
  )

  const handleSubmit = async (values: typeof form.values) => {
    const data = {
      codeDelivery: values.resi,
      statusDelivery: 'DIKIRIM',
    }
    const response = await post(`/api/order/${id}`, data, 'PUT')
    mutate(`/api/order/${id}`)
    console.log(response)
  }

  return (
    <AdminShell>
      <Group position='center' mb={20}>
        <Title>Order Details</Title>
      </Group>
      <Suspense fallback={<Loading />}>{details}</Suspense>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label='KODE RESI'
          required
          placeholder='003085801224'
          {...form.getInputProps('resi')}
        />
        <Group position='right' mt='md'>
          <button
            className='rounded bg-blue-500 px-4 py-2 text-blue-50 hover:bg-blue-400'
            type='submit'
          >
            Submit
          </button>
        </Group>
      </form>
    </AdminShell>
  )
}
export default OrderUpdate
