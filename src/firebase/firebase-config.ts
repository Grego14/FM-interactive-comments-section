import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'interactive-comments-sec-4282c.firebaseapp.com',
  projectId: 'interactive-comments-sec-4282c',
  storageBucket: 'interactive-comments-sec-4282c.firebasestorage.app',
  messagingSenderId: '334668120797',
  appId: '1:334668120797:web:7c4797a033841740169134'
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider()
googleProvider.addScope('email')

export const githubProvider = new GithubAuthProvider()
githubProvider.addScope('email')

export {
  auth,
  db,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
}
