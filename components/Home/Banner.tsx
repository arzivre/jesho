import Image from 'next/image'
import {
  Box,
  createStyles,
  Group,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core'

const useStyles = createStyles((theme) => ({
  box: {
    height: '500px',
    width:'350px',
    margin:'auto',
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
          Houseofjesho is a furniture company based in Semarang, Indonesia. We
          make out-of-the-ordinary furniture that balances form and function
        </Title>
        {/* <Text size='xl' weight={400}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt rem
          corrupti dolorum, quos laborum et deserunt, eius veniam ipsam eligendi
          facilis debitis officiis aliquam ab velit fugit nostrum dolores illum?
        </Text> */}
      </Box>
      <Group direction='row' position='center'>
        <Box className={classes.box}>
          <Image
            src='https://firebasestorage.googleapis.com/v0/b/jesho-store.appspot.com/o/products%2Fjesho%2Fa%20(1).jpg?alt=media&token=1749064b-0380-4421-92c9-0dfc2f1df887'
            alt='Banner'
            height='90%'
            width='70%'
            layout='responsive'
            objectFit='contain'
          />
        </Box>
      </Group>
    </SimpleGrid>
  )
}
export default Banner
