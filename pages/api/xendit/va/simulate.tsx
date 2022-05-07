import { NextApiRequest, NextApiResponse } from 'next'

/**
 * funct for testing virtual account or payment simulation
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const token = `${process.env.XENDIT_SECRET_KEY}:${process.env.XENDIT_SECRET_KEY}`
      const encodedToken = Buffer.from(token).toString('base64')

      const { externalId, amount } = req.body

      const response = await fetch(
        `https://api.xendit.co/callback_virtual_accounts/external_id=${externalId}/simulate_payment`,
        {
          body: JSON.stringify({
            amount,
          }),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + encodedToken,
          },
          method: 'POST',
        }
      )

      if (response.status >= 400) {
        return res.status(400).json({
          error: 'There was an error',
        })
      }
      // TODO: delete this

      return res.status(200).json(response.body)
    } catch (error) {
      return { error }
    }
  }
}
