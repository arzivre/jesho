import { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'libs/firebase-admin'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //! Check for secret to confirm this is a valid request
  // const token = req.headers['token']
  // if (token !== process.env.TOKEN) {
  //   return res.status(401).json({ message: 'Invalid token' })
  // }

  const { collection, id, limit } = req.query

  if (req.method === 'POST') {
    try {
      const docRef = db.collection(collection as string).doc()
      await docRef.set({
        ...req.body,
        docId: docRef.id,
      })
      res.status(201).json('Created')
    } catch (error: any) {
      res.status(400).json(error.message)
    }
  }

  if (req.method === 'PUT') {
    try {
      await db
        .collection(collection as string)
        .doc(id as string)
        .update(req.body)
      res.status(201).json('Updated')
    } catch (error: any) {
      res.status(400).json(error.message)
    }
  }

  if (req.method === 'DELETE') {
    try {
      await db
        .collection(collection as string)
        .doc(id as string)
        .delete()
      res.status(201).end(JSON.stringify('Deleted'))
    } catch (error: any) {
      res.status(400).json(error.message)
    }
  }

  if (req.method === 'GET') {
    if (id) {
      try {
        const results = await db
          .collection(collection as string)
          .doc(id as string)
          .get()

        res.status(200).json(results)
      } catch (error: any) {
        res.status(400).json(error.message)
      }
    }
    try {
      const snapshot = await db
        .collection(collection as string)
        .orderBy('createdAt', 'desc')
        .limit(Number(limit) || 25)
        .get()

      let results: any[] = []

      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() })
      })

      res.status(200).json(results)
    } catch (error: any) {
      res.status(400).json(error.message)
    }
  }
}
