import { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'libs/firebase-admin'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { order } = req.query
  //* GET
  if (req.method === 'GET') {
    try {
      const snapshot = await db
        .collection('orders')
        .where('userId', '==', order)
        .orderBy('createdAt', 'desc')
        .limit(5)
        .get()

      let results: any[] = []

      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() })
      })

      res.status(200).json(results)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
