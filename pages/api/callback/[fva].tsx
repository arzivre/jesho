/**
 * this func is called when the virtual account payment is created or
 * payment is paid
 */

import { db } from 'libs/firebase-admin'
import { NextApiRequest, NextApiResponse } from 'next'

export async function fvaCreated(data: Partial<FirebaseFirestore.DocumentData>) {
  return db
    .collection('virtual-accounts')
    .doc(data.external_id)
    .set({ external_id: data.external_id, ...data })
}

export async function fvaPaid(data: Partial<FirebaseFirestore.DocumentData>) {
  return db
    .collection('paids')
    .doc(data.external_id)
    .set({ external_id: data.external_id, ...data })
}

export async function updateOrder(external_id: string, newValues: { [x: string]: any; status?: string; isDelivered?: boolean; statusDelivery?: string }) {
  return db.collection('orders').doc(external_id).update(newValues)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const secure =
    req.method === 'POST' &&
    req.headers['x-callback-token'] === process.env.XENDIT_CALLBACK_TOKEN_API

  //! security check
  if (!secure) {
    res.status(401).json('Unauthorized')
  }

  if (req.method === 'POST') {
    const { fva } = req.query

    // Todo: change to switch
    if (fva === 'created') {
      fvaCreated(req.body)
      res.status(200).json(`Received Event successfully ${fva}`)
    }

    if (fva === 'paid') {
      updateOrder(req.body.external_id, {
        status: 'COMPLETED',
        isDelivered: false,
        statusDelivery: 'DIKEMAS',
      })
      fvaPaid(req.body)
      res.status(200).json(`Received Event successfully ${fva}`)
    }
  }
}

export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
  },
}
