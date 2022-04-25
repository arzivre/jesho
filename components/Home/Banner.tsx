import {
  Box,
  createStyles,
  Group,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core'
import Image from 'next/image'
const useStyles = createStyles((theme) => ({
  box: {
    padding: '0 5px',
    transition: '0.5s linear',
    boxShadow: '-8px 8px #FFC9C9',
    transform: 'translateY(8px,-8px)',
  },
}))

const Banner = () => {
  const { classes } = useStyles()

  return (
    <SimpleGrid
      cols={2}
      my={40}
      breakpoints={[
        { maxWidth: 980, cols: 3, spacing: 'md' },
        { maxWidth: 755, cols: 2, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}
    >
      <Box mb={40}>
        <Title order={1} mt={40} mb={20}>
          Varier is a furniture company based in Semarang, Indonesia. We make
          out-of-the-ordinary furniture that balances form and function
        </Title>
        <Text size='xl' weight={400}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt rem
          corrupti dolorum, quos laborum et deserunt, eius veniam ipsam eligendi
          facilis debitis officiis aliquam ab velit fugit nostrum dolores illum?
        </Text>
      </Box>
      <Group direction='row' position='center'>
        <Box className={classes.box}>
          <Image
            src='/images/a (1).jpg'
            alt='Banner'
            height={'500px'}
            width={'400px'}
          />
        </Box>
        {/* <Box className={classes.box}>
          <Image
            src='/images/a (2).jpg'
            alt='Banner'
            height={'100%'}
            width={'50%'}
          />
        </Box> */}
      </Group>
    </SimpleGrid>
  )
}
export default Banner
