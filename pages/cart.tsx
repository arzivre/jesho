import { Title } from '@mantine/core'
import Main from 'components/Main'
import { ProductProps } from 'libs/types'
import useCart from 'hooks/useCart'

const Cart = () => {
  let { cart, sumItems } = useCart()
  let { itemCount, total } = sumItems()
  return (
    <Main>
      <Title>Cart</Title>
      {cart.length > 0 &&
        cart.map((item: ProductProps) => (
          <div key={item.id}>
            <p>title: {item.title}</p>
            <p>Qty: {item.quantity}</p>
            <p>Total: {item.quantity! * Number(item.price)}</p>

            <hr />
          </div>
        ))}
      <p>Jumlah: {itemCount}</p>
      <p>Total: {total}</p>
    </Main>
  )
}
export default Cart
