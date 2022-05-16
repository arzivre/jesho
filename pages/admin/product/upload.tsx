import { ChangeEvent, Suspense, useState } from 'react'
import dynamic from 'next/dynamic'
import { Loading } from 'components/Loading'
import AdminShell from 'components/Admin/AdminShell'
import { Button, Group, InputWrapper, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useProduct } from 'hooks/useProduct'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { firestore, storage } from 'libs/firebase'
import { DataProps } from 'libs/types'

const RichTextEditor = dynamic(() => import('@mantine/rte'), {
  ssr: false,
  loading: () => <Loading />,
})

const UploadProduct = () => {
  const router = useRouter()
  const [content, onChange] = useState('<p> Descripsi produk</p>')
  const [thumbnail, setThumbnail] = useState<null | any>(null)
  const [thumbnailError, setThumbnailError] = useState('')

  const { uploadImage, loading, error } = useProduct('products')

  const form = useForm({
    initialValues: {
      title: '',
      price: '',
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    const searchQuery = values.title

    const data: DataProps = {
      ...values,
      content,
      slug: values.title.replace(/\s/g, '-'),
      searchQuery,
      createdAt: new Date().toISOString(),
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
      <Title>Upload</Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label='Title'
          placeholder='Nama Product'
          {...form.getInputProps('title')}
        />

        <TextInput
          required
          label='Harga'
          placeholder='Harga Product'
          {...form.getInputProps('price')}
        />

        <Suspense fallback={<Loading />}>
          <InputWrapper id='description' required label='Deskripsi Produk'>
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
          </InputWrapper>
        </Suspense>

        <InputWrapper label='Product Image' required labelElement='div'>
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
        </InputWrapper>

        <Group position='right'>
          {loading ? (
            <Button disabled>Loading..</Button>
          ) : (
            <Button type='submit'>Upload</Button>
          )}
        </Group>
        {error && <div>{error}</div>}
      </form>
    </AdminShell>
  )
}

export default UploadProduct
