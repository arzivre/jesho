import { useState } from 'react'
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  Text,
  useMantineTheme,
} from '@mantine/core'
import AdminNavbar from './AdminNavbar'
import Meta from 'components/Meta'

interface AdminShellProps {
  children: React.ReactNode
}
const AdminShell = ({ children }: AdminShellProps) => {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  return (
    <>
      <Meta title='Admin - Jesho' />
      <AppShell
        navbar={
          <Navbar
            hiddenBreakpoint='sm'
            hidden={!opened}
            width={{ base: 300 }}
            p={0}
            mt={-1}
          >
            <AdminNavbar />
          </Navbar>
        }
        header={
          <Header height={56} p='xs' className=' bg-gray-900'>
            <div style={{ display: 'flex', height: '100%' }}>
              <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size='sm'
                  className='text-white'
                  mr='xl'
                />
              </MediaQuery>

              <Text
                align='center'
                size='xl'
                color='white'
                sx={{ margin: 'auto' }}
              >
                Admin Section
              </Text>
            </div>
          </Header>
        }
      >
        {children}
      </AppShell>
    </>
  )
}
export default AdminShell
