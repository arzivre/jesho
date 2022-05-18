import Image from 'next/image'
import { Box, Group, SimpleGrid, Text, Title } from '@mantine/core'

const GridBanner = () => {
  return (
    <SimpleGrid
      cols={2}
      spacing='xl'
      mb={40}
      breakpoints={[{ maxWidth: 'xs', cols: 1 }]}
    >
      <Group direction='column' grow>
        <Box>
          <Title order={2}>Product</Title>
          <Text size='xl' weight={400}>
            Epic home decor from creative finger macrame and wood
          </Text>
        </Box>
        <Box style={{ margin: 'auto', height: '390px', width: '360px' }}>
          <Image
            src='https://firebasestorage.googleapis.com/v0/b/jesho-store.appspot.com/o/products%2Fjesho%2Fb_5_.webp?alt=media&token=25e7cdac-ad6f-4ec9-b731-7ab9658ffde4'
            alt='Banner'
            height='100%'
            width='100%'
            layout='responsive'
            objectFit='contain'
            priority
          />
        </Box>
      </Group>
      <Box style={{ margin: 'auto', height: '400px', width: '400px' }}>
        <Image
          src='https://firebasestorage.googleapis.com/v0/b/jesho-store.appspot.com/o/products%2Fjesho%2Fb_7_.webp?alt=media&token=c8cc54ca-b332-4bea-9099-ee7a055b5815'
          alt='Banner'
          height='100%'
          width='100%'
          layout='responsive'
          objectFit='contain'
          priority
        />
      </Box>
    </SimpleGrid>
  )
}
export default GridBanner
