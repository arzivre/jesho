import Image from 'next/image'
import {
  Box,
  Container,
  createStyles,
  Divider,
  Group,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core'

const useStyles = createStyles((theme) => ({
  box: {
    height: '600px',
    width: '450px',
    margin: 'auto',
  },
}))

const Banner = () => {
  const { classes, theme } = useStyles()

  return (
    <Box sx={(theme) => ({ background: theme.colors.pink[2] })}>
      <Container size='xl'>
        <SimpleGrid
          cols={2}
          py={40}
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: 'md' },
            { maxWidth: 755, cols: 2, spacing: 'sm' },
            { maxWidth: 600, cols: 1, spacing: 'sm' },
          ]}
        >
          <Box
            sx={{
              alignItems: 'center',
            }}
          >
            <Title
              order={1}
              mt={40}
              mb={20}
              sx={(theme) => ({
                color: theme.colors.dark[6],
                fontFamily: 'Greycliff CF',
                fontSize: theme.fontSizes.xl * 3,
                lineHeight: 1,
                [theme.fn.smallerThan('xs')]: {
                  fontSize: theme.fontSizes.xl * 1.5,
                },
              })}
            >
              <Box>Houseofjesho</Box>
              adalah perusahaan Jasa Cutting CNC Laser dan Router
            </Title>
          </Box>
         
        </SimpleGrid>
      </Container>
    </Box>
  )
}
export default Banner
