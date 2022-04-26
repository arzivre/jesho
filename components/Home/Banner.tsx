import {
  Box,
  createStyles,
  Group,
  SimpleGrid,
  Text,
  Title,
  Image,
} from '@mantine/core'
const useStyles = createStyles((theme) => ({
  box: {
    padding: '5px',
    transition: '0.5s linear',
    boxShadow: '-8px 8px #FFC9C9',
    '&:hover': {
      boxShadow: '8px -8px #FFC9C9',
      transition: '0.5s linear',
    },
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
            height='500px'
            width='400px'
          />
        </Box>
      </Group>
    </SimpleGrid>
  )
}
export default Banner
