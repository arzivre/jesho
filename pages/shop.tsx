import {
  Box,
  Container,
  Grid,
  Group,
  Image,
  Navbar,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
} from '@mantine/core'
import Main from 'components/Main'
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const getChild = (height: number) => (
  <Skeleton height={height} radius='md' animate={false} />
)
const BASE_HEIGHT = 360
const getSubHeight = (children: number, spacing: number) =>
  BASE_HEIGHT / children - spacing * ((children - 1) / children)

const Shop: NextPage = () => {
  const theme = useMantineTheme()

  const nav = (
    <div style={{position:'fixed'}}>
      <h2>1</h2>
      <h2>2</h2>
      <h2>3</h2>
    </div>
  )
  return (
    <>
      <Head>
        <title>Shop - Jesho</title>
      </Head>
      <Main>
        <Container my={100} >
          <Grid>
            <Grid.Col xs={3}>{nav}</Grid.Col>
            <Grid.Col xs={9}>
              <Group direction='row'>
                <Box style={{margin:'auto'}}>
                  <Image
                    src='/images/a (1).jpg'
                    alt='Banner'
                    height='300px'
                    width='300px'
                  />
                </Box>
                <Box style={{margin:'auto'}}>
                  <Image
                    src='/images/a (1).jpg'
                    alt='Banner'
                    height='300px'
                    width='300px'
                  />
                </Box>
              
               
              </Group>
            </Grid.Col>
          </Grid>
        </Container>
      </Main>
    </>
  )
}
export default Shop
