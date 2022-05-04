import { NextApiRequest,NextApiResponse } from 'next'
import { adminCollection } from 'libs/adminGetCollection'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const { order } = req.query
  if (req.method === 'GET') {
    try {
      const { results } = await adminCollection(
        'orders',
        ['userId', '==', order],
        ['createdAt', 'desc'],
        5
      )
      res.status(200).json(results)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
