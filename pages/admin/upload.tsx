import { Button } from '@mantine/core'
import AdminShell from 'components/Admin/AdminShell'
import { useProduct } from 'hooks/useProduct'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'

const UploadProduct = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [thumbnail, setThumbnail] = useState({})
  const [thumbnailError, setThumbnailError] = useState('')
  const [description, setDescription] = useState('')
  const { uploadImage, loading, response, error } = useProduct('products')

  const onSubmit = (e:any) => {
    e.preventDefault()
    const searchQuery = title.toLowerCase().trim().replace(' ', '')
    const values = {
      title,
      price,
      description,
      searchQuery,
    }
    uploadImage(thumbnail, values)

    // setTitle('')
    // setPrice('')
    // setThumbnail('')
    // setThumbnailError('')
    // setDescription('')
    // router.push('/admin/products')
    // console.log('response:', response)
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
      <h1>Upload</h1>

      <form onSubmit={onSubmit}>
        <label>
          <span>Title</span>
          <input
            type='text'
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <br />
        <label htmlFor=''>
          <span>Description</span>
          <textarea
            required
            rows={5}
            cols={50}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </label>

        <br />

        <label htmlFor=''>
          <span>Price</span>
          <input
            type='text'
            required
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </label>
        <br />

        <label>
          <span>Product Image</span>
          <input type='file' required onChange={handleFileChange} />
          {thumbnailError && <div className='error'>{thumbnailError}</div>}
        </label>
        <br />

        {loading ? (
          <Button disabled>Loading</Button>
        ) : (
          <Button type='submit'>Upload</Button>
        )}
        {error && <div>{error}</div>}
      </form>
    </AdminShell>
  )
}

export default UploadProduct
