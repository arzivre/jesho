//@ts-nocheck
import firebase from 'firebase/app'
import { auth, firestore as db } from 'libs/firebase'
import { proxy, useSnapshot } from 'valtio'

// Inside AuthProvider

let resolve
let initialCurrentUser = new Promise((r) => {
  resolve = r
})

let state = proxy({
  currentUser: initialCurrentUser,
  get status() {
    return this.currentUser instanceof Promise
      ? 'unknown'
      : this.currentUser === null
      ? 'unauthenticated'
      : 'authenticated'
  },
})

firebase.auth().onAuthStateChanged((user) => {
  resolve()

  if (user) {
    const uid = user.uid
    const data = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      provider: user.providerData[0]?.providerId,
      createdAt: new Date().toISOString(),
    }
    db.collection('users').doc(uid).set(data, { merge: true })
    state.currentUser = data
  } else {
    state.currentUser = user
  }
})

export default function useAuth() {
  return useSnapshot(state)
}

export const signinWithEmail = async (email: string, password: string) => {
  return await firebase.auth().signInWithEmailAndPassword(email, password)
}

export const signinWithGoogle = async (redirect: string) => {
  return await firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result)
      // const token = credential?.accessToken
      // The signed-in user info.
      // const user = result.user
      // console.log({ credential, token, user })
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error)
      // console.log({ errorCode, errorMessage, email, credential })
    })
}

export const signout = async () => {
  return await firebase.auth().signOut()
}
