import { GetStaticProps } from 'next'
import { Box, Button } from '@mantine/core'

import { db } from 'libs/firebase-admin'

import AdminShell from 'components/Admin/AdminShell'
import AdminTable from 'components/Admin/AdminTable'
import { ProductProps } from 'libs/types'


export const getStaticProps: GetStaticProps = async (context) => {
  const snapshot = await db.collection('products').orderBy('id', 'desc').get()

  let products: any[] = []

  snapshot.forEach((doc: { id: any; data: () => any }) => {
    products.push({ id: doc.id, ...doc.data() })
  })
  return {
    // will be passed to the page component as props
    props: { products },
    revalidate: 60,
  }
}
interface Props { 
  products: [ProductProps]
}
const Products = ({ products }: Props) => {
  const rows = products.map((product: ProductProps) => (
    <tr key={product.id}>
      <td>
        <Button>Edit</Button>
        <Button color='red'>Delete</Button>
      </td>
      <td>{product.id}</td>
      <td>{product.link}</td>
      <td>{product.price}</td>
      <td>{product.title}</td>
    </tr>
  ))
  const headers = (
    <tr>
      <th>Action</th>
      <th>Id</th>
      <th>Link</th>
      <th>Price</th>
      <th> Title</th>
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