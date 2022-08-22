import { CategoryProps } from 'libs/types'
import {
  Button,
  Card,
  Container,
  createStyles,
  Group,
  ScrollArea,
  Text,
} from '@mantine/core'
import NextLink from 'next/link'

const useStyles = createStyles((theme) => ({
  root: {
    position: 'sticky',
    top: 56,
    zIndex: 1,
  },
  card: {
    WebkitBackdropFilter: 'blur(8px)', // Safari
    backdropFilter: 'blur(8px)', // Chrome, Firefox
    boxShadow: ' 0px 10px 15px 10px rgb(0 0 0 / 1%)',
    backgroundColor: 'rgb(206 212 218 / 15%)',
  },
  main: {
    overflowX: 'hidden',
    maxWidth: '1000px',
  },
  header: {
    fontSize: theme.fontSizes.xl * 1.5,
    [theme.fn.largerThan('md')]: {
      fontSize: theme.fontSizes.xl * 2,
    },
  },
  category: {},
}))

interface Props {
  categories: [CategoryProps]
}
const Category = ({ categories }: Props) => {
  const { classes } = useStyles()
  const WIDTH = categories.length

  return (
    <Container size='lg' mb={20}>
      <Card pt={20} pb={0} className={classes.card}>
        <Text align='left' mb={10} className={classes.header}>
          Categori
        </Text>
        <Group mb={20} className={classes.category}>
          <NextLink href='/shop' passHref>
            <button
              className='rounded-sm bg-green-600 px-2 py-2 text-green-50 
                hover:bg-green-400 hover:text-green-900'
            >
              Semua Produk
            </button>
          </NextLink>
          {categories.map((category: CategoryProps) => (
            <NextLink
              key={category.docId}
              href={`/shop/category/${category.title}`}
              passHref
            >
              <button
                className='rounded-sm bg-green-600 px-2 py-2 text-green-50 
                hover:bg-green-400 hover:text-green-900'
              >
                {category.title}
              </button>
            </NextLink>
          ))}
        </Group>
      </Card>
    </Container>
  )
}
export default Category
