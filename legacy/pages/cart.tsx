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
  SimpleGrid,
} from '@mantine/core'
import useCart from 'hooks/useCart'
import { BsFillTrashFill } from 'react-icons/bs'
import Meta from 'components/Meta'

const Cart = () => {
  let { cart, clear, sumItems, increaseItem, decreaseItem, removeItem } =
    useCart()
  let { itemCount, total } = sumItems()
  if (itemCount === 0) {
    return (
      <Main>
        <Title align='center' my={150}>
          Keranjang Kosong
        </Title>
      </Main>
    )
  }

  return (
    <>
      <Meta title='Keranjang - Jesho' />
      <Main>
        <Container size='md'>
          {cart.length > 0 &&
            cart.map((item: ProductProps) => (
              <SimpleGrid
                key={item.productId}
                my={20}
                breakpoints={[
                  { minWidth: 755, cols: 2, spacing: 'md' },
                  { minWidth: 600, cols: 1, spacing: 'sm' },
                ]}
              >
                <Group position='center'>
                  <Image
                    src={item.imgUrl}
                    alt={item.title}
                    height={350}
                    width={350}
                  />
                </Group>
                <Box>
                  <Group position='apart' mb={10}>
                    <Text size='md'> {item.title}</Text>
                    <Text size='md'>Rp {item.price}</Text>
                  </Group>

                  <Group position='apart'>
                    <Text size='md'>Qty:</Text>
                    <Group>
                      <Button
                        mx={20}
                        variant='subtle'
                        color='dark'
                        size='md'
                        onClick={() => increaseItem(item.productId)}
                      >
                        +
                      </Button>
                      <Text size='md'> {item.quantity}</Text>
                      {item.quantity! > 1 && (
                        <Button
                          mx={20}
                          variant='subtle'
                          color='dark'
                          size='md'
                          onClick={() => decreaseItem(item.productId)}
                        >
                          -
                        </Button>
                      )}
                      {item.quantity === 1 && (
                        <Button
                          mx={20}
                          variant='outline'
                          color='pink'
                          size='sm'
                          onClick={() => removeItem(item.productId)}
                        >
                          <BsFillTrashFill />
                        </Button>
                      )}
                    </Group>
                  </Group>

                  <hr />

                  <Group position='apart'>
                    <Text size='md'>Total</Text>
                    <Text size='md'>
                      Rp {item.quantity! * Number(item.price)}
                    </Text>
                  </Group>
                </Box>
              </SimpleGrid>
            ))}
          <div className='grid grid-cols-1 text-right'>
            <Text size='md'>Jumlah {itemCount}</Text>
            <Text size='md'>Subtotal Rp {total}</Text>
            <Text size='md'>Pengiriman Rp 30000</Text>
            <Text size='xl'>Total Rp {total + 30000}</Text>
          </div>

          <div className='my-20 flex justify-end gap-8 text-right'>
            <button
              className='rounded bg-red-100 p-2 text-red-600 hover:bg-red-600 hover:text-red-900'
              onClick={() => clear()}
            >
              Clear Cart
            </button>
            <NextLink href='/checkout'>
              <a className='rounded bg-green-500 p-2 text-green-50 hover:bg-green-300'>
                Checkout
              </a>
            </NextLink>
          </div>
        </Container>
      </Main>
    </>
  )
}
export default Cart
