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
      const response = await db
        .collection('orders')
        .doc(id as string)
        .update(req.body)
      res.status(201).json(response)
    } catch (error: any) {
      console.error(error)
      res.status(400).json(error.message)
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
