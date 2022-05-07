import { ProductProps } from 'libs/types'
import { Suspense, useState } from 'react'
import { Loading, LoadingFullScreen } from 'components/Loading'

import Main from 'components/Main'
import NextLink from 'next/link'

import useCart from 'hooks/useCart'
import useAuth from 'hooks/useAuth'
import post from 'utils/post'

import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Group,
  Image,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { firestore } from 'libs/firebase'

const Checkout = () => {
  let { cart, clear, sumItems } = useCart()
  let { itemCount, total } = sumItems()
  let { currentUser: user }: any = useAuth()

  const [bankCode, setBankCode] = useState('MANDIRI')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown | null>(null)
  const [virtualAccount, setVirtualAccount] = useState<{} | null>(null)
  const [simulation, setSimulation] = useState<any | null>(null)

  const form = useForm({
    initialValues: {
      nama_depan: '',
      nama_belakang: '',
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
    // setError(null)
    // setLoading(true)
    // setVirtualAccount(null)

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
      bankCode: bankCode || 'BNI',
      name: user.name,
      expectedAmt: total,
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
      setLoading(false)
    } catch (error) {
      // console.error(error)
      setError(error)
      setLoading(false)
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
            <Button onClick={() => verivikasi(virtualAccount)}>Bayar</Button>
          </Group>
          {JSON.stringify(virtualAccount)}
          {simulation && JSON.stringify(simulation)}
        </Container>
      </Main>
    )
  }
  return (
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
              <Group direction='column' position='center'>
                <Title order={2}>Alamat Pengiriman</Title>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                  <Group grow>
                    <TextInput
                      label='Nama depan'
                      placeholder='Jhon'
                      {...form.getInputProps('nama_depan')}
                    />
                    <TextInput label='Nama Belakang' placeholder='Doe' />
                  </Group>
                  <Group grow>
                    <TextInput
                      label='Email'
                      placeholder='Jhon'
                      {...form.getInputProps('nama_belakang')}
                    />
                    <TextInput label='Phone' placeholder='0812 3456 7890' />
                  </Group>
                  <TextInput
                    label='Alamat Pengiriman'
                    placeholder='15329 Huston 21st'
                    {...form.getInputProps('alamat')}
                  />
                  <TextInput
                    label='Detail Alamat'
                    placeholder='(optional)'
                    {...form.getInputProps('detail_alamat')}
                  />
                  <Select
                    data={['Indonesia']}
                    placeholder='Indonesia'
                    label='Negara'
                    {...form.getInputProps('negara')}
                    value={'Indonesia'}
                  />
                  <Group direction='row' grow>
                    <TextInput
                      label='Provinsi'
                      placeholder='Jawa Barat'
                      {...form.getInputProps('provinsi')}
                    />
                    <TextInput
                      label='Kota'
                      placeholder='Jakarta'
                      {...form.getInputProps('kota')}
                    />
                    <TextInput
                      label='Kode Pos'
                      placeholder='65123'
                      {...form.getInputProps('kode_pos')}
                    />
                  </Group>
                  <RadioGroup
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
                  </RadioGroup>
                  <Group position='left' mt={20}>
                    <Button type='submit' value='Send'>
                      Checkout
                    </Button>
                  </Group>
                </form>
              </Group>
            </Suspense>

            <Suspense fallback={<Loading />}>
              <Group direction='column' position='center' grow>
                <Title order={2}>Keranjang</Title>

                <Suspense fallback={<Loading />}>
                  {cart.length > 0 &&
                    cart.map((item: ProductProps) => (
                      <Group key={item.id} spacing='xs' grow mb={20}>
                        <Box>
                          <Image
                            src={item.imgUrl}
                            alt={item.title}
                            height={140}
                            width={100}
                          />
                        </Box>
                        <Box>
                          <Group direction='column' position='right'>
                            <Text size='xl'> {item.title}</Text>
                            <Text size='xl'>
                              Rp {item.quantity! * Number(item.price)}
                            </Text>
                          </Group>
                        </Box>
                      </Group>
                    ))}

                  <Group direction='column' position='right'>
                    <Text size='xl'>subtotal: Rp{total}</Text>
                  </Group>
                </Suspense>
              </Group>
            </Suspense>
          </SimpleGrid>
        </Container>
      </Suspense>
    </Main>
  )
}
export default Checkout
