import { proxy, useSnapshot } from 'valtio'
import Cookies from 'js-cookie'

let initialCart = Cookies.get('cart')
  ? JSON.parse(Cookies.get('cart') as string)
  : []

const storeCartItems = (cartItems: string | any[]) => {
  const cart = cartItems.length > 0 ? cartItems : []
  Cookies.set('cart', JSON.stringify(cart))
}

const store = proxy({
  cart: initialCart,

  addItem: (newItems: any) => {
    const isNew = !store.cart.find(
      (item: { id: any }) => item.id === newItems.productId
    )

    const item = { ...newItems }
    delete item.createdAt
    delete item.searchQuery
    delete item.content

    if (isNew) {
      store.cart.push({
        ...item,
        quantity: 1,
      })
    }
  },

  increaseItem: (id: any) => {
    const increaseIndex = store.cart.findIndex(
      (item: any) => item.productId === id
    )
    store.cart[increaseIndex].quantity++
  },

  decreaseItem: (id: any) => {
    const decreaseIndex = store.cart.findIndex(
      (item: any) => item.productId === id
    )
    const product = store.cart[decreaseIndex]
    if (product.quantity > 1) {
      product.quantity--
    }
  },

  removeItem: (id: any) => {
    const removeIndex = store.cart.findIndex(
      (item: any) => item.productId === id
    )

    const index = store.cart.indexOf(removeIndex)
    store.cart.splice(index, 1) // 2nd parameter means remove one item only
    // store.cart = [
    //   store.cart.filter((item: { productId: any }) => item.productId !== id),
    // ]
  },

  clear: () => {
    Cookies.remove('cart')
    store.cart = []
  },

  sumItems: () => {
    storeCartItems(store.cart)

    return {
      itemCount: store.cart.reduce(
        (total: any, prod: { quantity: any }) => total + prod.quantity,
        0
      ),
      total: store.cart.reduce(
        (total: number, prod: { price: number; quantity: number }) =>
          total + prod.price * prod.quantity,
        0
      ),
    }
  },
})

export default function useCart() {
  return useSnapshot(store)
}
