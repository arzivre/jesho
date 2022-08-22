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
    <Container size='lg' mb={20} className={classes.root}>
      <Card pt={20} pb={0} className={classes.card}>
        <Text align='left' mb={10} className={classes.header}>
          Categori
        </Text>
        <ScrollArea>
          <Group
            mb={20}
            className={classes.category}
            style={{ width: `calc(300px + 150px * ${WIDTH})` }}
          >
            <NextLink href='/shop' passHref>
              <Button
                component='a'
                variant='gradient'
                gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                sx={{ width: 150 }}
              >
                Semua Produk
              </Button>
            </NextLink>
            {categories.map((category:CategoryProps) => (
              <NextLink
                key={category.docId}
                href={`/shop/category/${category.title}`}
                passHref
              >
                <button>
                  {category.title }
               </button>
              </NextLink>
            ))}
          </Group>
        </ScrollArea>
      </Card>
    </Container>
  )
}
export default Category
