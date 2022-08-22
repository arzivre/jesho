import {
  Button,
  Group,
  Radio,
  RadioGroup,
  Select,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import AdminShell from 'components/Admin/AdminShell'
import AdminTable from 'components/Admin/AdminTable'
import { Loading } from 'components/Loading'
import { db } from 'libs/firebase-admin'
import { GetStaticProps } from 'next'
import { Suspense, useState } from 'react'
import useSWR from 'swr'
import fetcher from 'utils/fetcher'
import post from 'utils/post'

export const getStaticProps: GetStaticProps = async (context) => {
  const snapshot = await db
    .collection('category')
    .orderBy('createdAt', 'desc')
    .get()

  let fallback: any[] = []

  snapshot.forEach((doc) => {
    fallback.push({ ...doc.data() })
  })
  return {
    // will be passed to the page component as props
    props: { fallback },
    revalidate: 24 * 3600,
  }
}
interface Category {
  docId: string
  title: string
  description: string
  createdAt: string
}
interface CategoryProps {
  fallback: [Category]
}
const AdminCategory = ({ fallback }: CategoryProps) => {
  const { data: categories } = useSWR('/api/firestore/category', fetcher, {
    fallback: fallback,
    suspense: true,
  })
  const [loading, setLoading] = useState(false)

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      type: 'product',
    },
  })

  const handleDelete = async (id: string) => {
    setLoading(true)
    await post('/api/firestore/category', id, 'DELETE')
    setLoading(false)
  }

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true)
    const data = { createdAt: new Date().toISOString(), ...values }
    await post('/api/firestore/category', data)
    setLoading(false)
  }

  const rows = categories.map((item: any) => (
    <tr key={item.createdAt}>
      <td>
        <Button color='red' onClick={() => handleDelete(item.docId)}>
          Delete
        </Button>
      </td>
      <td>
        <p>Id: {item.docId}</p>
        <p>{item.createdAt}</p>
      </td>
      <td>{item.type}</td>
      <td>{item.title}</td>
      <td>
        <Text>{item.description}</Text>
      </td>
    </tr>
  ))
  const headers = (
    <tr>
      <th>Delete</th>
      <th>Created At</th>
      <th>Type</th>
      <th>Title</th>
      <th>Description</th>
    </tr>
  )

  return (
    <AdminShell>
      <h2>Create Category</h2>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label='Title'
          placeholder='Nama Category'
          {...form.getInputProps('title')}
        />
        <TextInput
          label='Description'
          placeholder='(Optional) Descripsi Category'
          {...form.getInputProps('description')}
        />
        <RadioGroup
          label='Select Type Category'
          size='xl'
          required
          {...form.getInputProps('type')}
        >
          <Radio value='product' label='Product' />
          <Radio value='blog' label='Blog' />
        </RadioGroup>

        <Group position='right' mt={20}>
          {loading ? (
            <Button disabled>Loading..</Button>
          ) : (
            <button
              className='rounded bg-blue-500 px-4 py-2 text-blue-50 hover:bg-blue-400'
              type='submit'
            >
              Create
            </button>
          )}
        </Group>
      </form>
      <h1>Category</h1>
      <Suspense fallback={<Loading />}>
        <AdminTable headers={headers} rows={rows} />
      </Suspense>
    </AdminShell>
  )
}
export default AdminCategory
