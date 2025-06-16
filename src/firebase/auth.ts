import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from './firebase-config'
import type { User } from 'firebase/auth'

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    return userCredential.user
  } catch (error) {
    throw Error((error as Error).message)
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    return userCredential.user
  } catch (error) {
    throw Error((error as Error).message)
  }
}

export const logOut = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    throw Error((error as Error).message)
  }
}

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}
