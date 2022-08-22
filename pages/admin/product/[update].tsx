import { ChangeEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { Loading } from 'components/Loading'
import AdminShell from 'components/Admin/AdminShell'
import { Button, Group, InputWrapper, NativeSelect, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useProduct } from 'hooks/useProduct'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import { db } from 'libs/firebase-admin'
import { ParsedUrlQuery } from 'querystring'
import { CategoryProps, DataProps, ProductProps } from 'libs/types'
import { firestore } from 'libs/firebase'

const RichTextEditor = dynamic(() => import('@mantine/rte'), {
  ssr: false,
  loading: () => <Loading />,
})

type Props = {
  product: any
}

interface Params extends ParsedUrlQuery {
  update: string
}

interface UpdateProps {
  product: ProductProps
  categories: CategoryProps[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ref = await db.collection('products').get()
  const paths = ref.docs.map((doc) => {
    return {
      params: { update: doc.id },
    }
  })
  return {
    //* must be in this format => paths: [{ params: { id}}],
    // TODO: replace with slug for seo
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const params = context.params! // ! is a non-null assertion
  const doc = await db.collection('products').doc(params.update).get()
  const product = { id: doc.id, ...doc.data() }

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
    props: { product, categories },
    revalidate: 60,
  }
}

const UpdateProduct = ({ product, categories }: UpdateProps) => {
  const router = useRouter()
  const [content, onChange] = useState(product.content)
  const [thumbnail, setThumbnail] = useState<null | any>(null)
  const [thumbnailError, setThumbnailError] = useState('')
  
  const { uploadImage, loading, error } = useProduct('products')
  
  const categoryList = categories.map((category) => category.title)

  const form = useForm({
    initialValues: {
      title: product.title,
      price: product.price,
      category: product.category || '',
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    const searchQuery = values.title

    const data: DataProps = {
      content,
      productId: product.id,
      slug: values.title.replace(/\s/g, '-'),
      searchQuery,
      ...values,
    }

    if (thumbnail) {
      uploadImage(thumbnail, data, true)
      return router.push('/admin/product')
    }

    //* Add value to data object
    data.imgUrl = product.imgUrl

    await firestore
      .collection('products')
      .doc(product.id)
      .set(data, { merge: true })

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
      <Title my={40}>Update Product</Title>
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

        <NativeSelect
          data={categoryList}
          placeholder='Pick one'
          label='Select Category'
          required
          {...form.getInputProps('category')}
        />

        <InputWrapper label='Image lama' labelElement='div'>
          <br />
          <Group position='center' grow>
            {product.imgUrl && (
              <Image
                src={product.imgUrl}
                alt='preview'
                width={400}
                height={400}
              />
            )}
          </Group>
        </InputWrapper>

        <InputWrapper label='Ganti / Update Product Image' labelElement='div'>
          <br />
          <Group grow>
            <input type='file' onChange={handleFileChange} />
            {thumbnail && (
              <Image
                // @ts-ignores
                src={URL.createObjectURL(thumbnail)}
                alt='preview'
                width={400}
                height={400}
              />
            )}
          </Group>
          {thumbnailError && <div>{thumbnailError}</div>}
          <br />
        </InputWrapper>

        <InputWrapper
          id='description'
          required
          label='Deskripsi Produk'
          mb={20}
        >
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

        <Group position='right'>
          {loading ? (
            <button
              className='rounded bg-blue-500 px-4 py-2 text-blue-50 hover:bg-blue-400'
              disabled
            >
              Loading..
            </button>
          ) : (
            <button
              className='rounded bg-blue-500 px-4 py-2 text-blue-50 hover:bg-blue-400'
              type='submit'
            >
              Update
            </button>
          )}
        </Group>
        {error && <div>{error}</div>}
      </form>
    </AdminShell>
  )
}

export default UpdateProduct
