import { useState } from 'react'
import { firestore, serverTimestamp, storage } from 'libs/firebase'

export const useProduct = (folder: string) => {
  const [error, setError] = useState<null>(null)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<null | {}>(null)

  //upload to storage
  const uploadImage = async (thumbnail: any, values: any, merge?: boolean) => {
    setError(null)
    setLoading(true)

    try {
      const uploadPath = `${folder}/jesho/${thumbnail.name}`
      const img = await storage.ref(uploadPath).put(thumbnail)
      const imgUrl = await img.ref.getDownloadURL()

      const data = {
        ...values,
        imgUrl,
        createdAt: new Date().toISOString(),
      }

      const res = firestore
        .collection('products')
        .doc(data.slug)
        .set(data, { merge: merge || false })

      setResponse(res)
      setError(null)
      setLoading(false)
    } catch (error: any) {
      // console.log(error.message)
      setError(error.message)
      setLoading(false)
    }
  }

  return { error, loading, uploadImage, response }
}
