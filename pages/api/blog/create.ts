import { db } from 'libs/firebase-admin'
import { NextApiRequest, NextApiResponse } from 'next'

export async function CreateBlog(
  data: Partial<FirebaseFirestore.DocumentData>
) {
  return db.collection('blogs').doc(data.slug).set(data)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await CreateBlog(req.body)
    res.status(200).json(`Blog Created`)
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
}
