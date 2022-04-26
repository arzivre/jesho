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

interface AdminShellProps {
  children: React.ReactNode
}
const AdminShell = ({ children }: AdminShellProps) => {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  return (
    <AppShell
      padding='md'
      navbar={
        <Navbar
          hiddenBreakpoint='sm'
          hidden={!opened}
          width={{ base: 300 }}
          height={500}
          p='xs'
        >
          <AdminNavbar />
        </Navbar>
      }
      header={
        <Header height={60} p='xs'>
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size='sm'
                color={theme.colors.gray[6]}
                mr='xl'
              />
            </MediaQuery>

            <Text>Admin Section</Text>
          </div>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  )
}
export default AdminShell
