import { Box, Group, SimpleGrid, Text, Title, Image } from '@mantine/core'

const GridBanner = () => {
  return (
    <SimpleGrid
      cols={2}
      spacing='xl'
      breakpoints={[{ maxWidth: 'xs', cols: 1 }]}
    >
      <Group direction='column'>
        <Box mb={40}>
          <Title order={2}>Product</Title>
          <Text size='xl' weight={400}>
            Epic home decor from creative finger macrame and wood
          </Text>
        </Box>
        <Box style={{ margin: 'auto', height: '390px', width: '360px' }}>
          <Image
            src='/images/a (2).jpg'
            alt='Banner'
            height={'90%'}
            width={'90%'}
          />
        </Box>
      </Group>
      <Box style={{ margin: 'auto', height: '390px', width: '360px' }}>
        <Image
          src='/images/a (3).jpg'
          alt='Banner'
          height={'90%'}
          width={'90%'}
        />
      </Box>
    </SimpleGrid>
  )
}
export default GridBanner
