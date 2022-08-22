import { Anchor, Button, Group, Text, Title } from '@mantine/core'
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
        <Button disabled>Edit</Button>
      </td>
      <td>
        <button className='rounded bg-red-100 p-2 text-red-600 hover:bg-red-600 hover:text-red-900'>
          Delete
        </button>
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
      <th>Update (disabled)</th>
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
      <Group position='apart' mb={20}>
        <Title>Blogs</Title>
        <NextLink href='/admin/blog/upload' >
          <a
          className='rounded bg-blue-500 px-4 py-2 text-blue-50
          hover:bg-blue-400'
          >Upload a Blog</a>
        </NextLink>
      </Group>
      <AdminTable headers={headers} rows={rows} />
    </AdminShell>
  )
}
export default AdminBlog
