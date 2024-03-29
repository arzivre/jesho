import { Button, Group, Input, NativeSelect, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import AdminShell from 'components/Admin/AdminShell'
import { Loading } from 'components/Loading'
import { firestore, storage } from 'libs/firebase'
import { db } from 'libs/firebase-admin'
import { CategoryProps, DataProps } from 'libs/types'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, Suspense, useState } from 'react'

const RichTextEditor = dynamic(() => import('@mantine/rte'), {
  ssr: false,
  loading: () => <Loading />,
})

export const getStaticProps: GetStaticProps = async (context) => {
  const snapshot = await db
    .collection('category')
    .where('type', '==', 'product')
    .orderBy('createdAt', 'desc')
    .get()

  let categories: any[] = []

  snapshot.forEach((doc) => {
    categories.push({ ...doc.data() })
  })
  return {
    // will be passed to the page component as props
    props: { categories },
    revalidate: 60,
  }
}

interface Props {
  categories: [CategoryProps]
}

const UploadProduct = ({ categories }: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [content, onChange] = useState('<p> Descripsi produk</p>')
  const [thumbnail, setThumbnail] = useState<null | any>(null)
  const [thumbnailError, setThumbnailError] = useState('')

  const form = useForm({
    initialValues: {
      title: '',
      price: '',
      category: '',
      linkTokopedia: '',
      linkShopee:''
    },
  })

  const categoryList = categories.map((category) => category.title)

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true)
    const searchQuery = values.title

    const categoryIndex = categories.findIndex((category) => {
      return category.title === values.category
    })
    const categoryId = categories[categoryIndex].docId

    const data: DataProps = {
      content,
      createdAt: new Date().toISOString(),
      slug: values.title.replace(/\s/g, '-'),
      searchQuery,
      categoryId,
      ...values,
    }

    const uploadPath = `products/jesho/${thumbnail.name}`
    const img = await storage.ref(uploadPath).put(thumbnail)
    const imgUrl = await img.ref.getDownloadURL()

    data.imgUrl = imgUrl

    const docRef = firestore.collection('products').doc()
    await docRef.set({
      ...data,
      productId: docRef.id,
    })
    setLoading(false)
    router.push('/admin/product')
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setThumbnail({})
    //@ts-ignore
    let selected = e.target.files[0]
    // console.log('selected', selected)

    if (!selected) {
      setThumbnailError('Please select a file')
      return
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('selected file must be an image')
      return
    }
    if (selected.size > 5000000) {
      setThumbnailError('Image must less than 5mb')
      return
    }

    setThumbnailError('')
    setThumbnail(selected)
    // console.log('Thumbnail Updated')
  }

  return (
    <AdminShell>
      <h1 className='mb-8 text-5xl'>Upload Product</h1>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label='Judul'
          placeholder='Nama Product'
          {...form.getInputProps('title')}
        />

        <TextInput
          required
          label='Harga'
          placeholder='Harga Product'
          {...form.getInputProps('price')}
        />
        <NativeSelect
          data={categoryList}
          label='Pilih Kategori'
          placeholder='Pilih Satu'
          required
          {...form.getInputProps('category')}
        />
        <TextInput
          label='Link Tokopedia'
          placeholder='link tokopedia'
          {...form.getInputProps('linkTokopedia')}
        />
        <TextInput
          label='link Shoppe'
          placeholder='link shopee'
          {...form.getInputProps('linkShopee')}
        />
        <Suspense fallback={<Loading />}>
          <Input.Wrapper id='description' required label='Deskripsi Produk'>
            <RichTextEditor
              value={content}
              onChange={onChange}
              controls={[
                ['bold', 'italic', 'underline', 'clean'],
                ['h1', 'h2', 'h3', 'h4'],
                [
                  'orderedList',
                  'unorderedList',
                  'alignLeft',
                  'alignCenter',
                  'alignRight',
                ],
              ]}
            />
          </Input.Wrapper>
        </Suspense>

        <Input.Wrapper label='Foto Produk' required labelElement='div'>
          <br />
          <Group grow>
            <input type='file' required onChange={handleFileChange} />
            {thumbnail ? (
              <Image
                // @ts-ignores
                src={URL.createObjectURL(thumbnail)}
                alt='preview'
                width={400}
                height={400}
              />
            ) : null}
          </Group>
          {thumbnailError && <div>{thumbnailError}</div>}
        </Input.Wrapper>

        <Group position='right'>
          {loading ? (
            <Button disabled>Loading..</Button>
          ) : (
            <button
              className='rounded bg-blue-500 px-4 py-2 text-blue-50 hover:bg-blue-400'
              type='submit'
            >
              Upload
            </button>
          )}
        </Group>
      </form>
    </AdminShell>
  )
}

export default UploadProduct
