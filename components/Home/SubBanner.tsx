import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Container, createStyles, Image } from '@mantine/core'

const images = [
  '/images/a (1).jpg',
  '/images/a (7).jpg',
  '/images/a (3).jpg',
  '/images/a (4).jpg',
  '/images/a (5).jpg',
  '/images/a (6).jpg',
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
                  src={image}
                  alt='image'
                  radius='md'
                  className={classes.img}
                />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </motion.div>
  )
}
export default SubBanner
