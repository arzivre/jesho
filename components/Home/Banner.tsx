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
          <Group direction='row' position='center'>
            <Box className={classes.box}>
              {/* <Image
                src='https://firebasestorage.googleapis.com/v0/b/jesho-store.appspot.com/o/blog%2Fjesho%2F20210409221416.jpg?alt=media&token=629bc9a0-ca6f-4040-b61c-3d27faa2c718'
                alt='Banner'
                height={1350}
                width={1080}
                layout='responsive'
                objectFit='contain'
                priority
              /> */}
            </Box>
          </Group>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
export default Banner
