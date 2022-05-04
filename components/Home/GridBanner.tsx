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
        <Image
          src='/images/a (2).jpg'
          alt='Banner'
          style={{ height: '600px', width: '400px' }}
        />
      </Group>
      <Image
        src='/images/a (3).jpg'
        alt='Banner'
        height='600px'
        width='400px'
      />
    </SimpleGrid>
  )
}
export default GridBanner
