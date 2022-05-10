import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import { Button, Container, createStyles, Group } from '@mantine/core'

const images = [
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/jesho-store.appspot.com/o/products%2Fjesho%2Fa%20(1).jpg?alt=media&token=1749064b-0380-4421-92c9-0dfc2f1df887',
    link: '/wNe84iljoIZti5daRisJ',
  },
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/jesho-store.appspot.com/o/products%2Fjesho%2Fa%20(2).jpg?alt=media&token=00ba7e92-55cf-44f0-83fc-d49387c22ef9',
    link: '/zeJVdPkjlSXtT5U5WhOl',
  },
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/jesho-store.appspot.com/o/products%2Fjesho%2Fa%20(3).jpg?alt=media&token=a8b7368b-c388-434d-86e1-57d64a56de43',
    link: '/vgMgx9jK4L4FWnM3OViM',
  },
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/jesho-store.appspot.com/o/products%2Fjesho%2Fa%20(4).jpg?alt=media&token=32a45b2e-5044-45ee-aa89-c82b1f9997bf',
    link: '/7i7Qv9zmsj8HfyHLUmro',
  },
]

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

const SubBanner = () => {
  const [widt, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)
  const { classes } = useStyles()

  useEffect(() => {
    if (null !== carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [])

  return (
    <motion.div ref={carousel} className={classes.carousel}>
      <Container size='xl'>
        <motion.div
          drag='x'
          dragConstraints={{ right: 0, left: -widt }}
          whileTap={{ cursor: 'grabbing' }}
          className={classes.innerCarousel}
        >
          {images.map((image, index) => (
            <motion.div key={index} className={classes.item}>
              <Image
                src={image.url}
                alt='Banner'
                height='90%'
                width='70%'
                layout='responsive'
                objectFit='contain'
                className={classes.img}
              />
              <br />
              <Group position='center'>
                <NextLink href={image.link} passHref>
                  <Button component='a' variant='outline' color='gray'>
                    Product Details
                  </Button>
                </NextLink>
              </Group>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </motion.div>
  )
}
export default SubBanner
