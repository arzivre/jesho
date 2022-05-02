import { Title } from '@mantine/core'
import Main from 'components/Main'
import useCart from 'hooks/useCart'
import { ProductProps } from 'libs/types'
import { Key, ReactChild, ReactFragment, ReactPortal } from 'react'

const Cart = () => {
  let { cart, sumItems } = useCart()
  let { itemCount, total } = sumItems()
  return (
    <Main>
      <Title>Cart</Title>
      {cart.length > 0 &&
        cart.map((item: ProductProps) => (
          <div key={item.id}>
            <p>{item.title}</p>
            <p>{item.quantity}</p>
            <p>{item.quantity! * Number(item.price)}</p>
            <p>{itemCount}</p>
            <p>{total}</p>
          </div>
        ))}
    </Main>
  )
}
export default Cart
