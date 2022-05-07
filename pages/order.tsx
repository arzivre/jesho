import { Suspense } from 'react'
import { Loading } from 'components/Loading'

import useAuth, { signinWithGoogle } from 'hooks/useAuth'
import useSWR from 'swr'
import fetcher from 'utils/fetcher'

import Main from 'components/Main'
import { FcGoogle } from 'react-icons/fc'
import { Button, Container, Group, Image, Text, Title } from '@mantine/core'

const OrderList = () => {
  let { currentUser }: any = useAuth()

  const { data, error } = useSWR(`api/user/${currentUser.uid}`, fetcher, {
    suspense: true,
  })
  return (
    <>
      {data.map((order: any) => (
        <Container key={order.id} size='md' mb={20}>
          <Group position='apart'>
            <Text>{order.items.itemCount}</Text>
            <Text>{order.createdAt.slice(0, 10)}</Text>
            <Text>{order.statusDelivery}</Text>
            <Text>{order.items.itemCount}</Text>
          </Group>

          <Group direction='column' style={{ height: '190px', width: '160px' }}>
            {order.items.cart.map((item: any) => (
              <Image
                key={item.title}
                src={item.imgUrl ? item.imgUrl : item.link}
                alt={item.title}
                height={'90%'}
                width={'60%'}
              />
            ))}
          </Group>
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
