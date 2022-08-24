import Head from 'next/head'

interface MetaProps {
  title?: string
  author?: string
  description?: string
  image?: string
  url?: string
  siteName?: string
}
const Meta = ({
  title = 'Jesho - House of Jesho',
  author = 'Agil Jesho',
  description = 'Houseofjesho adalah perusahaan Jasa Cutting CNC Laser dan Router Semarang',
  image,
  url,
  siteName,
}: MetaProps) => {
  return (
    <>
      <Head>
        <meta name='author' content={author} />
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={image} />
        <meta property='og:url' content={url} />
        <meta property='og:site_name' content={siteName} />
        <title>{title}</title>
      </Head>
    </>
  )
}

export default Meta
