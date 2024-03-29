import { Key, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import {
  Button,
  Container,
  createStyles,
  Divider,
  Group,
  Title,
} from '@mantine/core'
import { ProductProps } from 'libs/types'

// const images = [
//   {
//     url: 'https://firebasestorage.googleapis.com/v0/b/jesho-store.appspot.com/o/products%2Fjesho%2Fb_5_.webp?alt=media&token=25e7cdac-ad6f-4ec9-b731-7ab9658ffde4',
//     link: '/DIY-Dream-Catcher-Wall-Decor-Pink',
//   },
//   {
//     url: 'https://firebasestorage.googleapis.com/v0/b/jesho-store.appspot.com/o/products%2Fjesho%2Fb_2_.webp?alt=media&token=c6d933cb-d42a-4c06-b452-6a320e977590',
//     link: '/DIY-Dream-Catcher-Wall-Decor-Red',
//   },
//   {
//     url: 'https://firebasestorage.googleapis.com/v0/b/jesho-store.appspot.com/o/products%2Fjesho%2Fb_4_.webp?alt=media&token=36bcde37-6db1-43ad-85cc-0fa04c608541',
//     link: '/DIY-Dream-Catcher-Wall-Decor-White',
//   },
//   {
//     url: 'https://firebasestorage.googleapis.com/v0/b/jesho-store.appspot.com/o/products%2Fjesho%2Fb_1_.webp?alt=media&token=ad58bddb-bb8d-41ec-8bb9-c9413e42e497',
//     link: '/DIY-Dream-Catcher-Wall-Gray-new',
//   },
// ]

const useStyles = createStyles((theme) => ({
  carousel: {
    cursor: 'grab',
    overflow: 'hidden',
    marginBottom: 40,
    padding: 40,
    background: theme.colors.teal[1],
  },
  innerCarousel: {
    display: 'flex',
  },
  item: {
    minWidth: '25rem',
    width: '33%',
    margin: 4,
    padding: 4,
  },
  img: {
    height: '100%',
    width: '100%',
    pointerEvents: 'none',
  },
}))
interface Props {
  images: [ProductProps]
}
const SubBanner = ({ images }: Props) => {
  const [widt, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)
  const { classes, theme } = useStyles()

  useEffect(() => {
    if (null !== carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [])

  return (
    <motion.div ref={carousel} className={classes.carousel}>
      <Container size='xl'>
        <Title order={2} mb={16} sx={{ fontFamily: 'Greycliff CF' }}>
          Produk Terbaru
          <Divider
            color='pink'
            size='xl'
            sx={(theme) => ({
              // color: theme.colors.lime[9],
              width: '90px',
            })}
          />
        </Title>
        <motion.div
          drag='x'
          dragConstraints={{ right: 0, left: -widt }}
          whileTap={{ cursor: 'grabbing' }}
          className={classes.innerCarousel}
        >
          {images.map(
            (
              image: { slug: string; imgUrl: string },
              index: Key | null | undefined
            ) => (
              <motion.div key={index} className={classes.item}>
                <div
                  style={{
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={image.imgUrl}
                    alt='Banner'
                    height='90%'
                    width='70%'
                    layout='responsive'
                    objectFit='cover'
                    priority
                    className={classes.img}
                  />
                </div>
                <br />
                <Group position='center'>
                  <NextLink href={`/${image.slug}`} passHref>
                    <Button
                      component='a'
                      variant='gradient'
                      gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
                    >
                      Product Details
                    </Button>
                  </NextLink>
                </Group>
              </motion.div>
            )
          )}
        </motion.div>
      </Container>
    </motion.div>
  )
}
export default SubBanner
