import AdminShell from 'components/Admin/AdminShell'
import { Button, Group, InputWrapper, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'

import { storage } from 'libs/firebase'
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  Suspense,
  useState,
} from 'react'
import post from 'utils/post'
import Image from 'next/image'
import { Loading } from 'components/Loading'
import dynamic from 'next/dynamic'

const RichTextEditor = dynamic(() => import('@mantine/rte'), {
  ssr: false,
  loading: () => <Loading />,
})
const initialValue = '<p> Tulis Konten disini </p>'

const AdminUploadBlog = () => {
  const [content, onChange] = useState(initialValue)
  const [loading, setLoading] = useState(false)
  const [thumbnail, setThumbnail] = useState<null | any>(null)
  const [thumbnailError, setThumbnailError] = useState('')

  const form = useForm({
    initialValues: {
      title: '',
      slug: '',
      description: '',
    },
  })

  const handleFileChange = (
    e: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  ) => {
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

  const handleImageUpload = (file: File): Promise<string> =>
    new Promise(async (resolve, reject) => {
      const uploadPath = `blog/jesho/${file.name}`
      const img = await storage.ref(uploadPath).put(file)
      const imgUrl = await img.ref.getDownloadURL()
      resolve(imgUrl)
    })

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true)

    const uploadPath = `blog/jesho/${thumbnail?.name}`
    const img = await storage.ref(uploadPath).put(thumbnail)
    const imgUrl = await img.ref.getDownloadURL()

    const blog = {
      ...values,
      content: content,
      cover: imgUrl || null,
      publishedAt: new Date().toISOString(),
    }

    try {
      await post('/api/blog/create', blog)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <AdminShell>
      <h1>Upload blog</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label='Title'
          placeholder='Judul blog'
          {...form.getInputProps('title')}
        />
        <TextInput
          required
          label='Slug'
          placeholder='Slug (url) blog'
          value={form.values.slug.replace(/\s/g, '-')}
          onChange={(event) =>
            form.setFieldValue(
              'slug',
              event.currentTarget.value.replace(/\s/g, '-')
            )
          }
        />

        <TextInput
          required
          label='Description'
          placeholder='Descripiton blog'
          {...form.getInputProps('description')}
        />

        <InputWrapper
          label='Blog Cover / Thumbnail'
          required
          labelElement='div'
        >
          <br />
          <Group grow>
            <input type='file' required onChange={handleFileChange} />
            {thumbnail ? (
              <Image
                // @ts-ignores
                src={URL.createObjectURL(thumbnail)}
                alt='preview'
                width={600}
                height={400}
              />
            ) : null}
          </Group>
          {thumbnailError && <div>{thumbnailError}</div>}
        </InputWrapper>

        <Suspense fallback={<Loading />}>
          <InputWrapper id='content' required label='Content'>
            <RichTextEditor
              value={content}
              onChange={onChange}
              onImageUpload={handleImageUpload}
            />
          </InputWrapper>
        </Suspense>

        <Group position='right' mt='md'>
          {loading ? (
            <Button disabled>Loading..</Button>
          ) : (
            <Button type='submit'>Upload</Button>
          )}
        </Group>
      </form>

      <h2>Preview Content</h2>
      {thumbnail ? (
        <Group position='center'>
          <Image
            // @ts-ignores
            src={URL.createObjectURL(thumbnail)}
            alt='preview'
            width={600}
            height={400}
          />
        </Group>
      ) : null}
      <Title align='center'>{form.values.title}</Title>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </AdminShell>
  )
}
export default AdminUploadBlog
