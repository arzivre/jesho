import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 } from 'uuid'
import { db, storage } from 'libs/firebase-admin'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //* POST
  if (req.method === 'POST') {
    // upload(req)
  }
  //! DELETE
  if (req.method === 'DELETE') {
    try {
      await db.collection('products').doc(req.body).delete()
      res.status(204).end()
    } catch (error) {
      console.error(error)
    }
  }
  //* GET
  if (req.method === 'GET') {
    const snapshot = await db
      .collection('products')
      .orderBy('createdAt', 'desc')
      .get()

    let products: any[] = []

    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() })
    })
    res.status(200).json(products)
  }
}

// async function upload(req: NextApiRequest) {
//   const uuid = v4()
//   const tes = {
//     id: 'ts',
//     title: 'tes',
//     price: 'tes',
//     thumbnail: 'public/images/a (6).jpg',
//     folder: 'tes',
//   }
//   const { id, title, price, thumbnail, folder } = req.body
//   // const uploadPath = `${folder}/jesho/${thumbnail.name}`
//   //@ts-ignore
//   const createPersistentDownloadUrl = (bucket, pathToFile, downloadToken) => {
//     return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
//       pathToFile
//     )}?alt=media&token=${downloadToken}`
//   }
//   const img = await storage
//     .bucket('gs://jesho-store.appspot.com')
//     .upload(thumbnail, {
//       destination: folder,
//       metadata: {
//         metadata: {
//           firebaseStorageDownloadTokens: uuid,
//         },
//       },
//     })
//   // console.log('img', img)

//   const data = {
//     id,
//     title,
//     price,
//     url: createPersistentDownloadUrl('jesho-store.appspot.com', folder, uuid),
//   }

//   // const response = await db.collection('products').doc(data.id).set(data)
//   //@ts-ignore
//   return res.status(200).json(data)
// }
