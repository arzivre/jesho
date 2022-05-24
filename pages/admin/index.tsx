import { Card, Group, Text, Title } from '@mantine/core'
import AdminShell from 'components/Admin/AdminShell'
import { db } from 'libs/firebase-admin'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async (context) => {
  const product = await db.collection('products').get()
  const user = await db.collection('users').get()
  const order = await db.collection('orders').get()
  const delivered = await db
    .collection('orders')
    .where('isDelivered', '==', true)
    .get()

  const productSize = product.size.toString()
  const userSize = user.size.toString()
  const orderSize = order.size.toString()
  const deliveredSize = delivered.size.toString()

  return {
    props: { productSize, userSize, orderSize, deliveredSize },
    revalidate: 60,
  }
}

interface Props {
  userSize: string
  orderSize: string
  deliveredSize: string
  productSize: string
}
const Dashboard = ({
  productSize,
  userSize,
  orderSize,
  deliveredSize,
}: Props) => {
  return (
    <AdminShell>
      <Title mb={20}>Dashboard</Title>

      <Group position='apart' grow>
        <Card p='xl' sx={{ background: '#63E6BE' }}>
          <Title align='center' order={2}>Product</Title>
          <Text align='center' color='white' size='xl' weight={700}>
            {productSize}
          </Text>
        </Card>
        <Card p='xl' sx={{ background: '#63E6BE' }}>
          <Title align='center' order={2}>Users</Title>
          <Text align='center' color='white' size='xl' weight={700}>
            {userSize}
          </Text>
        </Card>
        <Card p='xl' sx={{ background: '#63E6BE' }}>
          <Title align='center' order={2}>Orders</Title>
          <Text align='center' color='white' size='xl' weight={700}>
            {orderSize}
          </Text>
        </Card>
        <Card p='xl' sx={{ background: '#63E6BE' }}>
          <Title align='center' order={2}>Order Terkirim</Title>
          <Text align='center' color='white' size='xl' weight={700}>
            {deliveredSize}
          </Text>
        </Card>
      </Group>
    </AdminShell>
  )
}
export default Dashboard
