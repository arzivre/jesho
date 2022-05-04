import { NextApiRequest, NextApiResponse } from 'next'
import xendit from 'libs/xendit'

const expirationDate = () => {
  const date = new Date()
  const day = date.getDate() + 3
  const month = date.getMonth()
  const year = date.getFullYear()
  const expiration_date = new Date(year, month, day)
  return expiration_date
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const VirtualAcc = xendit.VirtualAcc
      const vaOptions = {}

      const va = new VirtualAcc(vaOptions)

      const { externalID, bankCode, name, expectedAmt, metadata } = req.body

      const newVa = await va.createFixedVA({
        externalID,
        bankCode,
        name,
        isClosed: true,
        expectedAmt,
        expirationDate: expirationDate(),
      })
      //* Combine data
      const data = {
        ...newVa,
        ...metadata,
      }

      res.status(200).send(data)
    } catch (error:any) {
      return res.status(400).send(`error: ${error.message}`)
    }
  }

  if (req.method === 'PUT') {
    try {
      const { VirtualAcc } = xendit
      const vaSpecificOptions = {}
      const va = new VirtualAcc(vaSpecificOptions)

      const { id, expectedAmt } = req.body

      const resp = await va.updateFixedVA({
        id,
        expectedAmt,
      })
      res.status(200).send(resp)
    } catch (error: any) {
      return res.status(400).send(`error: ${error.message}`)
    }
  }

  if (req.method === 'GET') {
    try {
      const { VirtualAcc } = xendit
      const vaSpecificOptions = {}

      const { id } = req.body

      const va = new VirtualAcc(vaSpecificOptions)

      const resp = await va.getFixedVA({ id })

      res.status(200).send(resp)
    } catch (error: any) {
      return res.status(400).send(`error: ${error.message}`)
    }
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
}
