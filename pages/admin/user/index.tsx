import { Anchor, Button, Image, Text } from '@mantine/core'
import AdminShell from 'components/Admin/AdminShell'
import AdminTable from 'components/Admin/AdminTable'
import { Loading } from 'components/Loading'
import { db } from 'libs/firebase-admin'
import { BlogProps } from 'libs/types'
import { GetStaticProps } from 'next'
import NextLink from 'next/link'
import { Suspense } from 'react'

export const getStaticProps: GetStaticProps = async (context) => {
  const snapshot = await db
    .collection('users')
    .orderBy('createdAt', 'desc')
    .get()

  let users: any[] = []

  snapshot.forEach((doc) => {
    users.push({ ...doc.data() })
  })
  return {
    // will be passed to the page component as props
    props: { users },
    revalidate: 60,
  }
}
interface Props {
  users: any
}
const AdminUser = ({ users }: Props) => {
  const rows = users.map((user: any) => (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.provider}</td>
      <td>
        <Image src={user.photoURL} alt={user.name} width='50px' height='50px' />
      </td>
    </tr>
  ))
  const headers = (
    <tr>
      <th>Name</th>
      <th>email</th>
      <th>provider</th>
      <th>Photo</th>
    </tr>
  )
  return (
    <AdminShell>
      <Text>User</Text>
      <Suspense fallback={<Loading />}>
        <AdminTable headers={headers} rows={rows} />
      </Suspense>
    </AdminShell>
  )
}
export default AdminUser
