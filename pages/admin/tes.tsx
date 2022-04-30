import { Suspense, useEffect } from 'react'
import { Loader } from '@mantine/core'
import useAuth, { signinWithGoogle, signout } from 'hooks/useAuth'
import Main from 'components/Main'

const Tes = () => {
  let { currentUser } = useAuth()

  useEffect(() => {
    console.log(currentUser)
  }, [currentUser])

  return currentUser ? (
    <Main>
      <Suspense fallback={<Loader />}>
        <h1>Tes</h1>
        <button onClick={() => signout()}> signout</button>
      </Suspense>
    </Main>
  ) : (
    <Main>
      <h1>Tes</h1>

      {/* <button onClick={() => signinWithEmail()}>Email</button> */}
      <button onClick={() => signinWithGoogle('/admin/tes')}> tes</button>
    </Main>
  )
}
export default Tes
