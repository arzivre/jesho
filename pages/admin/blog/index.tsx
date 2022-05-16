import { Anchor, Button, Text } from '@mantine/core'
import AdminShell from 'components/Admin/AdminShell'
import AdminTable from 'components/Admin/AdminTable'
import { db } from 'libs/firebase-admin'
import { BlogProps } from 'libs/types'
import { GetStaticProps } from 'next'
import NextLink from 'next/link'

export const getStaticProps: GetStaticProps = async (context) => {
  const snapshot = await db
    .collection('blogs')
    .orderBy('publishedAt', 'desc')
    .get()

  let blogs: any[] = []

  snapshot.forEach((doc) => {
    blogs.push({ id: doc.id, ...doc.data() })
  })
  return {
    // will be passed to the page component as props
    props: { blogs },
    revalidate: 60,
  }
}
interface Props {
  blogs: BlogProps[]
}
const AdminBlog = ({ blogs }: Props) => {
  const rows = blogs.map((blog) => (
    <tr key={blog.id}>
      <td>
        <Button>Edit</Button>
        <Button color='red'>Delete</Button>
      </td>
      <td>{blog.id}</td>
      <td>{blog.title}</td>
      <td>{blog.slug}</td>
      <td>{blog.description}</td>
      <td>
        <NextLink href={`/blog/${blog.slug}`} passHref>
          <Anchor>{blog.title}</Anchor>
        </NextLink>
      </td>
    </tr>
  ))
  const headers = (
    <tr>
      <th>Action</th>
      <th>Id</th>
      <th>Title</th>
      <th>slug</th>
      <th>Description</th>
      <th>content</th>
    </tr>
  )
  return (
    <AdminShell>
      <h1>Blog</h1>
      <AdminTable headers={headers} rows={rows} />
    </AdminShell>
  )
}
export default AdminBlog