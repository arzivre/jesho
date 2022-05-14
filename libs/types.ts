export interface ProductProps {
  id: string
  slug: string
  price: string
  title: string
  description: string
  content: string
  imgUrl: string
  createdAt: string
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
