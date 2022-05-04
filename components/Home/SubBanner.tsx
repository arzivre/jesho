import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import { Button, Container, createStyles, Group, Image } from '@mantine/core'

const images = [
  { url: '/images/a (1).jpg', link: '/wNe84iljoIZti5daRisJ' },
  { url: '/images/a (2).jpg', link: '/zeJVdPkjlSXtT5U5WhOl' },
  { url: '/images/a (3).jpg', link: '/vgMgx9jK4L4FWnM3OViM' },
  { url: '/images/a (4).jpg', link: '/7i7Qv9zmsj8HfyHLUmro' },
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
                alt='image'
                radius='md'
                className={classes.img}
              />
              <Group position='center'>
                <NextLink href={image.link} passHref>
                  <Button component='a' variant='outline' color='gray'>Product Details</Button>
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
