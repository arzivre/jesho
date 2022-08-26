import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'libs/firebase-admin'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //! DELETE
  if (req.method === 'DELETE') {
    try {
      await db.collection('orders').doc(req.body).delete()
      res.status(204).end()
    } catch (error) {
      console.error(error)
    }
  }
  //* GET
  if (req.method === 'GET') {
    const snapshot = await db
      .collection('orders')
      .orderBy('createdAt', 'desc')
      .get()

    let orders: any[] = []

    snapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() })
    })
    res.status(200).json(orders)
  }
}
