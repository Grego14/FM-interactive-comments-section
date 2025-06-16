import type { UserDocument } from '../pages/auth/SignUp'
import { useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import { useAuth } from '../firebase/context/AuthContext'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/firebase-config'
import getFriendlyAuthError from '../utils/getFriendlyAuthError'
import toast from '../toast'

export default function useUpdateUser(data: Partial<UserDocument>) {
  const { currentUser } = useAuth()

  const [user, setUser] = useState<{
    auth: User | null
    user: UserDocument | null
  }>({ auth: currentUser || null, user: null })
  const [loadingUser, setLoadingUser] = useState(false)

  useEffect(() => {
    async function fetchUserFromDocument() {
      if (!data.uid)
        throw Error("useUpdateUser hook can't work without the uid prop!")

      try {
        setLoadingUser(true)

        const userDoc = await getDoc(doc(db, 'users', data?.uid))

        if (userDoc.exists()) {
          setUser(state => ({
            auth: state.auth,
            user: userDoc.data() as UserDocument
          }))
        }
      } catch (err) {
        const error = getFriendlyAuthError((err as Error).message)

        toast({
          content: error.message,
          type: 'error'
        })
      } finally {
        setLoadingUser(false)
      }
    }

    fetchUserFromDocument()
  }, [data.uid])

  return { user, loading: loadingUser }
}
