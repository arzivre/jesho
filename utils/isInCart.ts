import { ProductProps } from 'libs/types'

export default function isInCart(cart: any[], product: ProductProps) {
  return cart.find((item: { id: number | string }) => item.id === product.id)
}
