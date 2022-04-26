import { db, storage } from 'libs/firebase-admin'
import type { NextApiRequest, NextApiResponse } from 'next'
import { uuid } from 'uuidv4'
type Data = {
  id: string
  title: string
  price: string
  thumbnail: string
  folder: string
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tes = {
    id: 'ts',
    title: 'tes',
    price: 'tes',
    thumbnail: 'public/images/a (3).jpg',
    folder: 'tes',
  }
  const { id, title, price, thumbnail, folder } = tes
  // const uploadPath = `${folder}/jesho/${thumbnail.name}`
  //@ts-ignore
  const createPersistentDownloadUrl = (bucket, pathToFile, downloadToken) => {
    return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
      pathToFile
    )}?alt=media&token=${downloadToken}`
  }
  const img = await storage
    .bucket('gs://jesho-store.appspot.com')
    .upload(thumbnail, {
      destination: thumbnail,
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: uuid(),
          url: createPersistentDownloadUrl(
            'jesho-store.appspot.com',
            'public/images/a (3).jpg',
            uuid()
          ),
        },
      },
    })
  console.log('img', img)

  const data = {
    id,
    title,
    price,
    img,
  }

  // const response = await db.collection('products').doc(data.id).set(data)
  //@ts-ignore
  res.status(200).json(data)
}
