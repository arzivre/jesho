import { useEffect, useState, useRef, Suspense } from 'react'
import { Loading } from 'components/Loading'
import { Container, createStyles, Image } from '@mantine/core'
import { motion } from 'framer-motion'

const images = [
  '/images/a (1).jpg',
  '/images/a (2).jpg',
  '/images/a (3).jpg',
  '/images/a (1).jpg',
  '/images/a (2).jpg',
  '/images/a (3).jpg',
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
              <Suspense fallback={<Loading />}>
                <Image
                  src={image}
                  alt='image'
                  radius='md'
                  className={classes.img}
                />
              </Suspense>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </motion.div>
  )
}
export default SubBanner
