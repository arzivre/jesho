import { Button, Group, Radio, Select, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import AdminShell from 'components/Admin/AdminShell'
import AdminTable from 'components/Admin/AdminTable'
import { Loading } from 'components/Loading'
import { format, parseISO } from 'date-fns'
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
        <button
          className='rounded bg-red-100 p-2 text-red-600 hover:bg-red-600
        hover:text-red-900'
          onClick={() => handleDelete(item.docId)}
        >
          Delete
        </button>
      </td>
      <td>
        <p>{format(parseISO(item.createdAt), 'dd MMM yyyy')}</p>
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
      <th>Tgl Dibuat</th>
      <th>Tipe</th>
      <th>Judul</th>
      <th>Deskripisi</th>
    </tr>
  )

  return (
    <AdminShell>
      <h1 className='mb-8 text-5xl'>Buat Kategory</h1>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label='Nama Category'
          placeholder='Nama Kategori'
          {...form.getInputProps('title')}
        />
        <TextInput
          label='Deskripsi'
          placeholder='(Optional) Deskripsi Kategori'
          {...form.getInputProps('description')}
          className='mb-4'
        />
        <Radio.Group
          label='Pilih Tipe Kategory'
          size='xl'
          required
          {...form.getInputProps('type')}
        >
          <Radio value='product' label='Product' />
          <Radio value='blog' label='Blog' />
        </Radio.Group>

        <Group position='right' mt={20}>
          {loading ? (
            <Button disabled>Loading..</Button>
          ) : (
            <button
              className='rounded bg-blue-500 px-4 py-2 text-blue-50 hover:bg-blue-400'
              type='submit'
            >
              Buat Kategori
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
