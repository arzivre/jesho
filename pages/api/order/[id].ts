import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'libs/firebase-admin'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  //* UPDATE
  if (req.method === 'PUT') {
    try {
      await db
        .collection('orders')
        .doc(id as string)
        .update(req.body)
      res.status(204).end()
    } catch (error) {
      console.error(error)
    }
  }
  //* GET
  if (req.method === 'GET') {
    const doc = await db
      .collection('orders')
      .doc(id as string)
      .get()
    res.status(200).json(doc.data())
  }
}
