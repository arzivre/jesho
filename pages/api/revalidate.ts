import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  // const token = req.headers['token']
  // if (token !== process.env.TOKEN) {
  //   return res.status(401).json({ message: 'Invalid token' })
  // }

  const urls = req.body

  try {
    // Revalidate the URLs for those documents
    // await Promise.all(
    //   urls.map(async (url: string) => await res.unstable_revalidate(url))
    // )
    await res.unstable_revalidate(req.body)
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue to show
    // the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}

//example dynamyc page
// const pages = ['/person/john/', '/news/article-written-by-tom']
// pages?.forEach(async (item) => {
//   const config: Config = {
//     method: 'post',
//     url: '/api/revalidate',
//     headers: {
//       'Content-Type': 'application/json',
//       token: process.env.TOKEN,
//     },
//     data: { revalidationURL: item },
//   }
//   const response = await fetch(config)
//   if (response.status !== 200)
//     console.warn({
//       message: `Error in revalidating the page ${item}`,
//       status: response.status,
//     })
// })

// await res.unstable_revalidate(`/testimonials/${req.body.revalidationURL}`)
// return res.status(200).json({ revalidated: true })
