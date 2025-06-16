import { updateProfile } from 'firebase/auth'
import { useAuth } from '../firebase/context/AuthContext.tsx'
import getFriendlyAuthError from '../utils/getFriendlyAuthError.js'
import { useContext } from 'react'
import { AppContext } from '../App'
import toast from '../toast.tsx'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/firebase-config.ts'

export default async function useUpdateUserProfile({
  displayName,
  photoURL
}: { displayName: string; photoURL: string }) {
  const { lang } = useContext(AppContext)
  const { currentUser } = useAuth()

  try {
    if (!currentUser) throw Error('Invalid user')

    await updateProfile(currentUser, { displayName, photoURL })

    setDoc(doc(db, 'users', currentUser.uid), {
      username: displayName,
      avatar: photoURL
    }).catch(err => {
      throw err
    })
  } catch (err) {
    toast({
      content: getFriendlyAuthError((err as Error).message, lang).message
    })
  }
}
