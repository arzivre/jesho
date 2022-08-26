export interface ProductProps {
  id: string
  productId?: string
  slug: string
  price: string
  title: string
  description?: string
  content: string
  imgUrl: string
  createdAt: string
  category?: string
  quantity?: number | undefined
}

export interface BlogProps {
  id: string
  description: string
  slug: string
  cover?: string
  content: string
  title: string
  publishedAt: string
}

export interface ImageProps {
  lastModified: number
  name: string
  size: number
  type: string
}

export interface DataProps {
  productId?: string
  content: string
  title: string
  price: string | number
  slug: string
  searchQuery: string
  imgUrl?: string
  createdAt?: string
  categoryId: String
}

export interface CategoryProps {
  docId: string
  title: string
  description: string
  createdAt: string
}

export interface OrderDetailProps {
  currency: string
  expected_amount: number
  codeDelivery: string
  expiration_date: string
  shippingAddress: ShippingAddress
  is_single_use: boolean
  statusDelivery: string
  name: string
  owner_id: string
  external_id: string
  bank_code: string
  userId: string
  items: Items
  id: string
  status: string
  is_closed: boolean
  isDelivered: boolean
  merchant_code: string
  email: string
  createdAt: string
  userName: string
  account_number: string
}

export interface Items {
  cart: Cart[]
  itemCount: number
  total: number
}

export interface Cart {
  quantity: number
  id: string
  createdAt: string
  slug: string
  title: string
  price: string
  searchQuery: string
  imgUrl: string
}

export interface ShippingAddress {
  nama_belakang: string
  provinsi: string
  negara: string
  nama_depan: string
  kode_pos: string
  kota: string
  alamat: string
  detail_alamat: string
  phone: string
  email: string
}
