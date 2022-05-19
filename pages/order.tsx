import {
  Accordion,
  Button,
  Card,
  Container,
  createStyles,
  Group,
  Image,
  Modal,
  ScrollArea,
  Text,
  Title,
} from '@mantine/core'
import { Loading } from 'components/Loading'
import Main from 'components/Main'
import VirtualAccount from 'components/VirtualAccount'
import { format, parseISO } from 'date-fns'
import useAuth, { signinWithGoogle } from 'hooks/useAuth'
import { Suspense, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import useSWR, { mutate } from 'swr'
import fetcher from 'utils/fetcher'
import post from 'utils/post'
import { OrderDetailProps } from 'libs/types'

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
  const [modal, setOpened] = useState({ open: false, id: '' })
  let { currentUser }: any = useAuth()

  const { data, error } = useSWR(`api/user/${currentUser.uid}`, fetcher, {
    suspense: true,
  })

  const { classes } = useStyles()

  const handleOnClick = async (id: string) => {
    const data = {
      isDelivered: true,
      deliveredAt: new Date().toLocaleString(),
      statusDelivery: 'TERKIRIM',
    }
    await post(`/api/order/${id}`, data, 'PUT')
    mutate(`api/user/${currentUser.uid}`)
  }

  return (
    <>
      {data.map((order: OrderDetailProps) => (
        <Container key={order.id} size='md' mb={20}>
          {order.status === 'PENDING' ? (
            <Modal
              opened={order.external_id === modal.id ? modal.open : false}
              onClose={() => setOpened({ open: false, id: '' })}
              title='Virtual Account'
            >
              <VirtualAccount data={order} />
            </Modal>
          ) : null}

          <Card className={classes.container}>
            <Card.Section>
              <Group position='apart' className={classes.header}>
                <Button
                  color={`${order.status === 'PENDING' ? 'yellow' : 'lime'}`}
                >
                  STATUS:{' '}
                  {order.statusDelivery === 'DIKIRIM'
                    ? `DIKIRIM - RESI:${order.codeDelivery}`
                    : order.statusDelivery}
                </Button>
                <Text>Jumlah: {order.items.itemCount}</Text>
                <Text>Total: Rp {order.expected_amount}</Text>
                <Text>
                  {format(parseISO(order.createdAt), 'dd MMM yyyy - H:mm')}
                </Text>
                {order.statusDelivery === 'DIKIRIM' && (
                  <Button
                    variant='gradient'
                    gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
                    onClick={() => handleOnClick(order.external_id)}
                  >
                    Terkirim
                  </Button>
                )}
                {order.status === 'PENDING' && (
                  <Button
                    onClick={() =>
                      setOpened({ open: true, id: order.external_id })
                    }
                    mt={8}
                  >
                    Bayar
                  </Button>
                )}
              </Group>
            </Card.Section>
            <Card.Section component={ScrollArea} className={classes.main}>
              <Group
                direction='column'
                style={{ height: '200px', width: '200px' }}
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
                      height={'100%'}
                      width={'100%'}
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
                      Phone:
                      {order.shippingAddress.phone || ''}
                      <hr />
                      Alamat: {order.shippingAddress.negara}{' '}
                      {order.shippingAddress.provinsi}{' '}
                      {order.shippingAddress.kota}
                      {order.shippingAddress.alamat}{' '}
                      {order.shippingAddress.detail_alamat || ''}{' '}
                      {order.shippingAddress.kode_pos}
                      <hr />
                      Kode pos:
                      {order.shippingAddress.kode_pos}
                    </Text>
                  </Group>
                </Accordion.Item>
              </Accordion>
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
