import { ProductProps } from 'libs/types'
import { Suspense, useState } from 'react'
import { Loading } from 'components/Loading'

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

const items = [
  { title: 'Home', href: '/' },
  { title: 'Keranjang', href: '/cart' },
  { title: 'Checkout', href: '/checkout' },
].map((item, index) => (
  <NextLink key={index} href={item.href} passHref>
    <Text component='a'>{item.title}</Text>
  </NextLink>
))

const Checkout = () => {
  let { cart, clear, sumItems } = useCart()
  let { itemCount, total } = sumItems()
  const [value, setValue] = useState('MANDIRI')
  let { currentUser: user }: any = useAuth()

  const creataVa = async (bank: string, details: any) => {
    // setError(null)
    // setLoading(true)

    const metadata = {
      email: user.email,
      userId: user.uid,
      userName: user.name,
      shippingAddress: details,
      items: { cart, itemCount, total },
      statusDelivery: 'PENDING',
      codeDelivery: 'PENDING',
      isDelivered: false,
    }

    const order = {
      externalID: 'va-' + new Date().getTime().toString(),
      bankCode: bank || 'BNI',
      name: user.name,
      expectedAmt: total,
      metadata,
    }
    
    try {
      const res = await post('api/xendit/va/virtual_account', order)
      // Create Order Document
      // addDocument(res)
      // setVirtualAccount(res)

      clear()
      // setLoading(false)
    } catch (error) {
      // console.error(error)
      // setError(error)
      // setLoading(false)
    }
  }

  return (
    <Main>
      <Container size='xl'>
        <Group position='left'>
          <Breadcrumbs>{items}</Breadcrumbs>
        </Group>
      </Container>
      <Container size='lg' my={20}>
        <SimpleGrid
          cols={2}
          spacing='xl'
          breakpoints={[
            { maxWidth: 'sm', cols: 2, spacing: 'sm' },
            { maxWidth: 'xs', cols: 1, spacing: 'sm' },
          ]}
        >
          <Group direction='column' position='center' grow>
            <Title order={2}>Alamat Pengiriman</Title>
            <form>
              <Group grow>
                <TextInput label='Nama depan' placeholder='Jhon' />
                <TextInput label='Nama Belakang' placeholder='Doe' />
              </Group>
              <TextInput
                label='Alamat Pengiriman'
                placeholder='15329 Huston 21st'
              />
              <TextInput label='Detail Alamat' placeholder='(optional)' />
              <Select
                data={['Indonesia']}
                placeholder='Indonesia'
                label='Negara'
                value={'Indonesia'}
              />
              <Group direction='row' grow>
                <TextInput label='Provinsi' placeholder='Jawa Barat' />
                <TextInput label='Kota' placeholder='Jakarta' />
                <TextInput label='Kode Pos' placeholder='65123' />
              </Group>
              <RadioGroup
                label='Pilih Metode Pembayaran Virtual Account'
                description='Virtual Account'
                required
                value={value}
                onChange={setValue}
              >
                <Radio value='MANDIRI' label='MANDIRI' />
                <Radio value='BNI' label='BNI' />
                <Radio value='BRI' label='BRI' />
                <Radio value='BCA ' label='BCA' />
              </RadioGroup>
              <Group position='left' mt={20}>
                <Button>Bayar</Button>
              </Group>
            </form>
          </Group>

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
        </SimpleGrid>
      </Container>
    </Main>
  )
}
export default Checkout
