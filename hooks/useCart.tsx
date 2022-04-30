import { proxy, useSnapshot } from 'valtio'
import Cookies from 'js-cookie'

let initialCart = Cookies.get('cart')
  ? JSON.parse(Cookies.get('cart') as string)
  : []

const store = proxy({
  cart: initialCart,
  addItem: (newItems: any) => {
    if (!store.cart.find((item: { id: any }) => item.id === newItems.id)) {
      store.cart.push({
        ...newItems,
        quantity: 1,
      })
    }
    Cookies.set('cart', JSON.stringify(store.cart))
  },
  increaseItem: (id: any) => {
    const increaseIndex = store.cart.findIndex((item: any) => item.id === id)
    store.cart[increaseIndex].quantity++
  },
  decreaseItem: (id: any) => {
    const decreaseIndex = store.cart.findIndex((item: any) => item.id === id)
    const product = store.cart[decreaseIndex]
    if (product.quantity > 1) {
      product.quantity--
    }
  },
})

export default function useCart() {
  return useSnapshot(store)
}
// const storeCartItems = (cartItems) => {
//   const cart = cartItems.length > 0 ? cartItems : []
//   Cookies.set('cart', JSON.stringify(cart))
// }

// export const sumItems = (cartItems) => {
//   storeCartItems(cartItems)
//   return {
//     itemCount: cartItems.reduce((total, prod) => total + prod.quantity, 0),
//     total: cartItems.reduce(
//       (total, prod) => total + prod.price * prod.quantity,
//       0
//     ),
//   }
// }
//     case 'REMOVE_ITEM':
//       const newCartItems = state.cartItems.filter(
//         (item) => item.id !== action.payload.id
//       )
//       return {
//         ...state,
//         cartItems: [...newCartItems],
//         ...sumItems(newCartItems),
//       }
//     case 'CLEAR':
//       Cookies.remove('cart')
//       return {
//         cartItems: [],
//         itemCount: 0,
//         total: 0,
//       }
//     default:
//       return state
//   }
// }
