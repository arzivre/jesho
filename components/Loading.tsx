import { Loader } from '@mantine/core'

export const Loading = () => {
  return (
    <Loader
      style={{
        display: 'flex',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  )
}
export const LoadingFullScreen = () => {
  return (
    <Loader
      style={{
        display: 'flex',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    />
  )
}
