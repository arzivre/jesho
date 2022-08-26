import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Group,
  Image,
  Radio,
  Select,
  SimpleGrid,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification, updateNotification } from '@mantine/notifications'
import { Loading, LoadingFullScreen } from 'components/Loading'
import Main from 'components/Main'
import Meta from 'components/Meta'
import VirtualAccount from 'components/VirtualAccount'
import useAuth, { signinWithGoogle } from 'hooks/useAuth'
import useCart from 'hooks/useCart'
import { firestore } from 'libs/firebase'
import { ProductProps } from 'libs/types'
import NextLink from 'next/link'
import { Suspense, useState } from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import post from 'utils/post'

const Checkout = () => {
  let { cart, clear, sumItems } = useCart()
  let { itemCount, total } = sumItems()
  let { currentUser: user }: any = useAuth()

  const [bankCode, setBankCode] = useState('MANDIRI')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown | null>(null)
  const [virtualAccount, setVirtualAccount] = useState<{} | null>(null)
  //! Tes Simulasi Pembayaran
  const [simulation, setSimulation] = useState<any | null>(null)

  const form = useForm({
    initialValues: {
      nama_depan: '',
      nama_belakang: '',
      email: '',
      phone: '',
      alamat: '',
      detail_alamat: '',
      negara: 'Indonesia',
      provinsi: '',
      kota: '',
      kode_pos: '',
    },
  })

  const items = [
    { title: 'Home', href: '/' },
    { title: 'Keranjang', href: '/cart' },
    { title: 'Checkout', href: '/checkout' },
  ].map((item, index) => (
    <NextLink key={index} href={item.href} passHref>
      <Text component='a'>{item.title}</Text>
    </NextLink>
  ))

  const handleSubmit = async (values: typeof form.values) => {
    showNotification({
      id: 'checkout',
      title: 'Memproses Pesanan',
      message: 'Loading...',
      disallowClose: true,
      loading: true,
    })
    setError(null)
    setLoading(true)
    setVirtualAccount(null)

    const metadata = {
      email: user.email,
      userId: user.uid,
      userName: user.name,
      shippingAddress: values,
      items: { cart, itemCount, total },
      statusDelivery: 'PENDING',
      codeDelivery: 'PENDING',
      isDelivered: false,
    }

    const order = {
      externalID: 'va-' + new Date().getTime().toString(),
      bankCode: bankCode || 'MANDIRI',
      name: values.nama_depan + ' ' + values.nama_belakang,
      expectedAmt: total + 30000,
      //! combine metadata in server
      metadata,
    }
    // console.log('order', order)

    try {
      const results = await post('api/xendit/va/virtual_account', order)

      //* Create Order Document
      const createdAt = new Date().toISOString()
      await firestore
        .collection('orders')
        .doc(results.external_id)
        .set({ ...results, createdAt })
      setVirtualAccount(results)

      clear()
      updateNotification({
        id: 'sukses',
        color: 'teal',
        title: 'Sukses',
        message: 'Tutup notifikasi ini sekarang',
        icon: <BsFillCheckCircleFill />,
        autoClose: 5000,
      })
      setLoading(false)
    } catch (error) {
      console.error(error)
      setError(error)
      setLoading(false)
      updateNotification({
        id: 'error',
        color: 'red',
        title: 'Error',
        message: 'Coba Lagi atau Kontak admin untuk minta bantuan',
        autoClose: 5000,
      })
    }
  }

  //! Tes Simulasi Pembayaran
  const verivikasi = async (virtualAccount: {
    external_id?: any
    expected_amount?: any
  }) => {
    setSimulation(null)
    const response = await post('/api/xendit/va/simulate', {
      externalId: virtualAccount.external_id,
      amount: virtualAccount.expected_amount,
    })
    setSimulation(response)
  }

  if (virtualAccount) {
    return (
      <Main>
        <Container>
          <Group position='center' mt={20}>
            <Button onClick={() => verivikasi(virtualAccount)}>
              Simulasi Bayar
            </Button>
          </Group>
          {simulation && JSON.stringify(simulation.status)}
          <br />
          {simulation && JSON.stringify(simulation.message)}
          <br />
          {/*@ts-ignore*/}
          <VirtualAccount data={virtualAccount} />
        </Container>
      </Main>
    )
  }
  if (!user) {
    return (
      <Main>
        <Group position='center' py={200} sx={{ background: '#A9E34B' }}>
          <Title align='center'>Please Login to Checkout</Title>
          <Button
            variant='white'
            color='dark'
            size='xl'
            leftIcon={<FcGoogle size={34} />}
            onClick={() => signinWithGoogle('/checkout')}
          >
            Login
          </Button>
        </Group>
      </Main>
    )
  }
  return (
    <>
      <Meta title='Checkout - Jesho'/>
      <Main>
        <Suspense fallback={<Loading />}>
          <Container size='xl'>
            <Group position='left'>
              <Breadcrumbs>{items}</Breadcrumbs>
            </Group>
          </Container>
        </Suspense>

        {loading && <LoadingFullScreen />}

        <Suspense fallback={<LoadingFullScreen />}>
          <Container size='lg' my={20}>
            <SimpleGrid
              cols={2}
              spacing='xl'
              breakpoints={[
                { maxWidth: 'sm', cols: 2, spacing: 'sm' },
                { maxWidth: 'xs', cols: 1, spacing: 'sm' },
              ]}
            >
              <Suspense fallback={<Loading />}>
                <Group position='center'>
                  <Title order={2}>Alamat Pengiriman</Title>
                  <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Group grow mb={10}>
                      <TextInput
                        required
                        label='Nama depan'
                        placeholder='Jhon'
                        {...form.getInputProps('nama_depan')}
                      />
                      <TextInput
                        required
                        label='Nama Belakang'
                        placeholder='Doe'
                        {...form.getInputProps('nama_belakang')}
                      />
                    </Group>
                    <Group grow mb={10}>
                      <TextInput
                        required
                        label='Email'
                        placeholder='Jhon'
                        {...form.getInputProps('email')}
                      />
                      <TextInput
                        required
                        label='Phone'
                        placeholder='0812 3456 7890'
                        {...form.getInputProps('phone')}
                      />
                    </Group>
                    <TextInput
                      required
                      label='Alamat Pengiriman'
                      placeholder='15329 Huston 21st'
                      {...form.getInputProps('alamat')}
                      mb={10}
                    />
                    <TextInput
                      label='Detail Alamat'
                      placeholder='(optional)'
                      {...form.getInputProps('detail_alamat')}
                      mb={10}
                    />
                    <Select
                      data={['Indonesia']}
                      placeholder='Indonesia'
                      label='Negara'
                      {...form.getInputProps('negara')}
                      value={'Indonesia'}
                    />
                    <Group grow mb={10}>
                      <TextInput
                        required
                        label='Provinsi'
                        placeholder='Jawa Barat'
                        {...form.getInputProps('provinsi')}
                      />
                      <TextInput
                        required
                        label='Kota'
                        placeholder='Jakarta'
                        {...form.getInputProps('kota')}
                      />
                      <TextInput
                        required
                        label='Kode Pos'
                        placeholder='65123'
                        {...form.getInputProps('kode_pos')}
                      />
                    </Group>
                    <Radio.Group
                      label='Pilih Metode Pembayaran Virtual Account'
                      description='Virtual Account'
                      required
                      value={bankCode}
                      onChange={setBankCode}
                    >
                      <Radio value='MANDIRI' label='MANDIRI' />
                      <Radio value='BNI' label='BNI' />
                      <Radio value='BRI' label='BRI' />
                      <Radio value='BCA ' label='BCA' />
                    </Radio.Group>
                    <Group position='left' mt={20}>
                      <button
                        className='rounded bg-blue-500 px-4 py-2 text-blue-50 hover:bg-blue-400'
                        type='submit'
                        value='Send'
                      >
                        Checkout
                      </button>
                    </Group>
                  </form>
                </Group>
              </Suspense>

              <Suspense fallback={<Loading />}>
                <Group position='center' grow>
                  <Title order={2} align='center'>
                    Keranjang
                  </Title>
                  <Suspense fallback={<Loading />}>
                    {cart.length > 0 &&
                      cart.map((item: ProductProps) => (
                        <Group key={item.productId} spacing='xs' grow mb={20}>
                          <Box>
                            <Image
                              src={item.imgUrl}
                              alt={item.title}
                              height={140}
                              width={100}
                            />
                          </Box>
                          <Box>
                            <Group position='right'>
                              <Text size='md'> {item.title}</Text>
                              <Text size='md'>
                                Rp {item.quantity! * Number(item.price)}
                              </Text>
                            </Group>
                          </Box>
                        </Group>
                      ))}

                    <div className='flex flex-col'>
                      <Text size='md'>subtotal: Rp {total}</Text>
                      <Text size='md'>Pengiriman: Rp 30000</Text>
                      <br />
                      <Text size='xl'>Total: Rp {total + 30000}</Text>
                    </div>
                  </Suspense>
                </Group>
              </Suspense>
            </SimpleGrid>
          </Container>
        </Suspense>
      </Main>
    </>
  )
}
export default Checkout
