import Image from 'next/image'
import { Box, Divider, Group, SimpleGrid, Text, Title } from '@mantine/core'
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
          <Title order={2} mb={16} sx={{ fontFamily: 'Greycliff CF' }}>
            Produk Lainya
            <Divider
              color='pink'
              size='xl'
              sx={() => ({
                // color: theme.colors.lime[9],
                width: '90px',
              })}
            />
          </Title>
          <Text size='xl' weight={400}>
            Dekorasi rumah
          </Text>
        </Box>
        <Box style={{ margin: 'auto', height: '400px', minWidth: '350px' }}>
          {/* <Image
            src='https://firebasestorage.googleapis.com/v0/b/jesho-store.appspot.com/o/products%2Fjesho%2Fb_5_.webp?alt=media&token=25e7cdac-ad6f-4ec9-b731-7ab9658ffde4'
            alt='Banner'
            height='80%'
            width='80%'
            layout='responsive'
            objectFit='contain'
            priority
          /> */}
        </Box>
      </Group>
      <div
        style={{
          margin: 'auto',
          height: '400px',
          minWidth: '350px',
        }}
      >
        {/* <Image
          src='https://firebasestorage.googleapis.com/v0/b/jesho-store.appspot.com/o/products%2Fjesho%2Fb_7_.webp?alt=media&token=c8cc54ca-b332-4bea-9099-ee7a055b5815'
          alt='Banner'
          height='80%'
          width='80%'
          layout='responsive'
          objectFit='contain'
          priority
        /> */}
      </div>
    </SimpleGrid>
  )
}
export default GridBanner
