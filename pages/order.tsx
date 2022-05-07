import { Suspense } from 'react'
import { Loading } from 'components/Loading'

import useAuth, { signinWithGoogle } from 'hooks/useAuth'
import useSWR from 'swr'
import fetcher from 'utils/fetcher'

import Main from 'components/Main'
import { FcGoogle } from 'react-icons/fc'
import {
  Button,
  Container,
  createStyles,
  Group,
  Image,
  Text,
  Title,
  Box,
  Card,
  Accordion,
  ScrollArea,
} from '@mantine/core'
import { parseISO, format } from 'date-fns'

const useStyles = createStyles((theme) => ({
  container: {
    borderRadius: 4,
  },
  header: {
    background: theme.colors.teal[6],
    color: theme.colors.gray[0],
    padding: '8px 12px',
  },
  main: {
    background: theme.colors.gray[1],
    padding: 8,
    overflowX: 'hidden',
  },
  images: {
    margin: '0 auto auto',
  },
}))

const OrderList = () => {
  let { currentUser }: any = useAuth()

  const { data, error } = useSWR(`api/user/${currentUser.uid}`, fetcher, {
    suspense: true,
  })
  const { classes, theme } = useStyles()

  return (
    <>
      {data.map((order: any) => (
        <Container key={order.id} size='md' mb={20}>
          <Card className={classes.container}>
            <Card.Section>
              <Group position='apart' className={classes.header}>
                <Text>Jumlah: {order.items.itemCount}</Text>
                <Text>Total: Rp {order.expected_amount}</Text>
                <Text>
                  {format(parseISO(order.createdAt), 'dd MMM yyyy - H:mm')}
                </Text>
                <Text>Status: {order.statusDelivery}</Text>
              </Group>
            </Card.Section>
            <Card.Section component={ScrollArea} className={classes.main}>
              <Group
                direction='column'
                style={{ height: '190px', width: '160px' }}
              >
                {order.items.cart.map((item: any) => (
                  <div key={item.title}>
                    <Text align='center'>
                      {item.title} x{item.quantity}
                    </Text>

                    <Image
                      src={item.imgUrl ? item.imgUrl : item.link}
                      alt={item.title}
                      className={classes.images}
                      height={'90%'}
                      width={'60%'}
                    />
                  </div>
                ))}
              </Group>
            </Card.Section>
            <Card.Section className={classes.main}>
              <Accordion iconPosition='right'>
                <Accordion.Item label='Alamat'>
                  <Group direction='column' grow>
                    <Text>
                      Nama: {order.shippingAddress.nama_depan}{' '}
                      {order.shippingAddress.nama_belakang}
                      <hr />
                      Alamat: {order.shippingAddress.negara}{' '}
                      {order.shippingAddress.provinsi}{' '}
                      {order.shippingAddress.kota}
                      {order.shippingAddress.alamat}{' '}
                      {order.shippingAddress.detail_alamat}{' '}
                      {order.shippingAddress.kode_pos}
                      <hr />
                      Kode pos:
                      {order.shippingAddress.kode_pos}
                    </Text>
                  </Group>
                </Accordion.Item>
              </Accordion>

              <Group position='right'>
                {order.status === 'PENDING' && <Button mt={8}>Bayar</Button>}
              </Group>
            </Card.Section>
          </Card>
        </Container>
      ))}
    </>
  )
}
const Order = () => {
  let { currentUser: user }: any = useAuth()

  const Unauthenticated = (
    <Main>
      <Group position='center'>
        <Title>Plese Login to see your order</Title>
      </Group>
      <Group position='center'>
        <Button
          mt={40}
          mb={100}
          variant='outline'
          leftIcon={<FcGoogle />}
          onClick={() => signinWithGoogle('/order')}
        >
          Login
        </Button>
      </Group>
    </Main>
  )

  if (!user) {
    return Unauthenticated
  }

  return (
    <Main>
      <Group position='center' mb={20}>
        <Title>Order</Title>
      </Group>
      <Suspense fallback={<Loading />}>
        <OrderList />
      </Suspense>
    </Main>
  )
}
export default Order

//! only to preview styling
// const data = [
//   {
//     id: '627620ffdcc03601051d16e7',
//     is_closed: true,
//     bank_code: 'MANDIRI',
//     account_number: '889089999680034',
//     status: 'PENDING',
//     expiration_date: '2022-05-09T17:00:00.000Z',
//     userId: 'U3dPLAyXYshWHtEum4uq2E2pZf53',
//     statusDelivery: 'PENDING',
//     merchant_code: '88908',
//     codeDelivery: 'PENDING',
//     email: 'ryuxzi68@gmail.com',
//     expected_amount: 50000,
//     external_id: 'va-1651908859716',
//     isDelivered: false,
//     owner_id: '615d0fc87198d4a2a5e8332a',
//     createdAt: '2022-05-07T07:34:22.608Z',
//     is_single_use: false,
//     items: {
//       itemCount: 5,
//       total: 50000,
//       cart: [
//         {
//           id: 'zeJVdPkjlSXtT5U5WhOl',
//           description:
//             'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, aliquid repudiandae iste neque officiis minima alias perferendis ipsum dolorem. Fugit fuga illo quidem debitis ducimus vitae ad eius quasi neque.',
//           quantity: 2,
//           title: 'product2',
//           price: '10000',
//           searchQuery: 'product2',
//           imgUrl:
//             'https://firebasestorage.googleapis.com/v0/b/jesho-store.appspot.com/o/products%2Fjesho%2Fa%20(2).jpg?alt=media&token=00ba7e92-55cf-44f0-83fc-d49387c22ef9',
//           createdAt: '2022-04-29T11:32:16.683Z',
//         },
//         {
//           searchQuery: 'product1',
//           createdAt: '2022-04-29T11:33:01.642Z',
//           price: '10000',
//           id: 'wNe84iljoIZti5daRisJ',
//           imgUrl:
//             'https://firebasestorage.googleapis.com/v0/b/jesho-store.appspot.com/o/products%2Fjesho%2Fa%20(1).jpg?alt=media&token=1749064b-0380-4421-92c9-0dfc2f1df887',
//           title: 'product1',
//           description: 'product1',
//           quantity: 3,
//         },
//       ],
//     },
//     userName: 'tech js',
//     currency: 'IDR',
//     shippingAddress: {
//       nama_belakang: 'auzicircle@gmail.com',
//       kode_pos: '12333',
//       negara: 'Indonesia',
//       provinsi: 'sdfsd',
//       detail_alamat: 'gfsfsf',
//       alamat: 'tes jalan street 123',
//       nama_depan: 'sonyfauzi',
//       kota: 'Kediri 123',
//     },
//     name: 'tech js',
//   },
//   {
//     id: '627623a8dcc03650511d197c',
//     bank_code: 'BRI',
//     status: 'PENDING',
//     is_single_use: false,
//     external_id: 'va-1651909540819',
//     name: 'tech js',
//     expected_amount: 20000,
//     userId: 'U3dPLAyXYshWHtEum4uq2E2pZf53',
//     isDelivered: false,
//     owner_id: '615d0fc87198d4a2a5e8332a',
//     expiration_date: '2022-05-09T17:00:00.000Z',
//     merchant_code: '92001',
//     is_closed: true,
//     userName: 'tech js',
//     items: {
//       cart: [
//         {
//           searchQuery: 'product2',
//           description:
//             'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, aliquid repudiandae iste neque officiis minima alias perferendis ipsum dolorem. Fugit fuga illo quidem debitis ducimus vitae ad eius quasi neque.',
//           id: 'zeJVdPkjlSXtT5U5WhOl',
//           title: 'product2',
//           createdAt: '2022-04-29T11:32:16.683Z',
//           imgUrl:
//             'https://firebasestorage.googleapis.com/v0/b/jesho-store.appspot.com/o/products%2Fjesho%2Fa%20(2).jpg?alt=media&token=00ba7e92-55cf-44f0-83fc-d49387c22ef9',
//           price: '10000',
//           quantity: 2,
//         },
//       ],
//       itemCount: 2,
//       total: 20000,
//     },
//     shippingAddress: {
//       provinsi: 'sdf',
//       kota: 'Kediri 123',
//       nama_belakang: 'auzicircle@gmail.com',
//       detail_alamat: 'sdefsdf',
//       kode_pos: '12333',
//       nama_depan: 'sonyfauzi',
//       negara: 'Indonesia',
//       alamat: 'tes jalan street 123',
//     },
//     codeDelivery: 'PENDING',
//     statusDelivery: 'PENDING',
//     currency: 'IDR',
//     email: 'ryuxzi68@gmail.com',
//     createdAt: '2022-05-07T07:45:43.883Z',
//     account_number: '920019999180968',
//   },
// ]
