import { ProductProps } from 'libs/types'
import NextLink from 'next/link'
import Main from 'components/Main'
import {
  Button,
  Box,
  Container,
  Group,
  Image,
  Title,
  Text,
} from '@mantine/core'
import useCart from 'hooks/useCart'

const Cart = () => {
  let { cart, clear, sumItems } = useCart()
  let { itemCount, total } = sumItems()
  return (
    <Main>
      <Container size='md'>
        {cart.length > 0 &&
          cart.map((item: ProductProps) => (
            <Group key={item.id} position='apart' spacing='xs' grow mb={20}>
              <Box>
                <Image
                  src={item.imgUrl}
                  alt={item.title}
                  height={200}
                  width={200}
                />
              </Box>
              <Box>
                <Group position='apart'>
                  <Text size='xl'> {item.title}</Text>
                  <Text size='xl'>Rp {item.price}</Text>
                </Group>

                <Group position='apart'>
                  <Text size='xl'>Qty:</Text>
                  <Text size='xl'> {item.quantity}</Text>
                </Group>

                <hr />

                <Group position='apart'>
                  <Text size='xl'>Total:</Text>
                  <Text size='xl'>
                    Rp {item.quantity! * Number(item.price)}
                  </Text>
                </Group>
              </Box>
            </Group>
          ))}
        <Group direction='column' position='right'>
          <Text size='xl'>Jumlah: {itemCount}</Text>
          <Text size='xl'>Total: Rp{total}</Text>
        </Group>
        <Group position='right' spacing='xl' mt={20}>
          <Button color='red' onClick={() => clear()}>
            Clear Cart
          </Button>
          <NextLink href='/checkout' passHref>
            <Button component='a'>Checkout</Button>
          </NextLink>
        </Group>
      </Container>
    </Main>
  )
}
export default Cart
