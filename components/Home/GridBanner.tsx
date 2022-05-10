import Image from 'next/image'
import { Box, Group, SimpleGrid, Text, Title } from '@mantine/core'

const GridBanner = () => {
  return (
    <SimpleGrid
      cols={2}
      spacing='xl'
      breakpoints={[{ maxWidth: 'xs', cols: 1 }]}
    >
      <Group direction='column' grow>
        <Box >
          <Title order={2}>Product</Title>
          <Text size='xl' weight={400}>
            Epic home decor from creative finger macrame and wood
          </Text>
        </Box>
        <Box style={{ margin: 'auto', height: '390px', width: '360px' }}>
          <Image
            src='https://firebasestorage.googleapis.com/v0/b/jesho-store.appspot.com/o/products%2Fjesho%2Fa%20(2).jpg?alt=media&token=00ba7e92-55cf-44f0-83fc-d49387c22ef9'
            alt='Banner'
            height='80%'
            width='80%'
            layout='responsive'
            objectFit='contain'
          />
        </Box>
      </Group>
      <Box style={{ margin: 'auto', height: '390px', width: '360px' }}>
        <Image
          src='https://firebasestorage.googleapis.com/v0/b/jesho-store.appspot.com/o/products%2Fjesho%2Fa%20(3).jpg?alt=media&token=a8b7368b-c388-434d-86e1-57d64a56de43'
          alt='Banner'
          height='90%'
          width='70%'
          layout='responsive'
          objectFit='contain'
        />
      </Box>
    </SimpleGrid>
  )
}
export default GridBanner
