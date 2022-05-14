import { ProductProps } from 'libs/types'
import { GetStaticProps } from 'next'

import { db } from 'libs/firebase-admin'
import { compareAsc, parseISO } from 'date-fns'

import AdminShell from 'components/Admin/AdminShell'
import AdminTable from 'components/Admin/AdminTable'

import { Box, Button, Image } from '@mantine/core'
import post from 'utils/post'

export const getStaticProps: GetStaticProps = async (context) => {
  const snapshot = await db
    .collection('products')
    .orderBy('createdAt', 'desc')
    .get()

  let products: any[] = []

  snapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() })
  })

  return {
    // will be passed to the page component as props
    props: { products },
    revalidate: 1,
  }
}
interface Props {
  products: [ProductProps]
}
const Products = ({ products }: Props) => {
  const handleDelete = async (id: string) => {
    const res = await post('/api/product/action', id, 'DELETE')
    console.log(res)
  }
  const rows = products.map((product: ProductProps) => (
    <tr key={product.id}>
      <td>
        <Button>Edit</Button>
        <Button color='red' onClick={() => handleDelete(product.slug)}>
          Delete
        </Button>
      </td>
      <td>{product.id}</td>
      <td>{product.title}</td>
      <td>{product.price}</td>
      <td>{product.description}</td>
      <td>
        <Image
          src={product.imgUrl}
          alt={product.title}
          width='100px'
          height='140px'
        />
      </td>
    </tr>
  ))
  const headers = (
    <tr>
      <th>Action</th>
      <th>Id</th>
      <th>Title</th>
      <th>Price</th>
      <th>Description</th>
      <th>Image</th>
    </tr>
  )
  return (
    <AdminShell>
      <Box>
        <AdminTable headers={headers} rows={rows} />
      </Box>
    </AdminShell>
  )
}
export default Products
