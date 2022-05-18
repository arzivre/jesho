import { ProductProps } from 'libs/types'

export default function isInCart(cart: any[], product: ProductProps) {
  return cart.find(
    (item: { productId: number | string }) =>
      item.productId === product.productId
  )
}
