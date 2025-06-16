import { Box } from '@mui/material'
import type { User } from 'firebase/auth'
import { type DataSnapshot, getDatabase, onValue, ref } from 'firebase/database'
import { doc, getDocFromCache, getDocFromServer } from 'firebase/firestore'
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import AppSpinner from '../../components/reusable/spinners/AppSpinner'
import useDebounce from '../../hooks/useDebounce.tsx'
import useTranslations from '../../hooks/useTranslations.tsx'
import type { UserDocument } from '../../pages/auth/SignUp'
import { onAuthStateChange } from '../auth.ts'
import { auth, db } from '../firebase-config.ts'

interface Auth {
  currentUser: User | null
  loading: boolean
  superUser: UserDocument | null
  isOffline: boolean
}

const AuthContext = createContext<Auth>({
  currentUser: null,
  loading: true,
  superUser: null,
  isOffline: false
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const t = useTranslations().authProvider

  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser)
  const [loading, setLoading] = useState(true)
  const [showLoadingText, setShowLoadingText] = useState(false)
  const [gettingUser, setGettingUser] = useState(false)
  const [superUser, setSuperUser] = useState<UserDocument | null>(null)
  const [isOffline, setIsOffline] = useState(false)

  const [_, offlineDebounce] = useDebounce(
    (snap: DataSnapshot) => {
      setIsOffline(!snap.val());

      // if this is true mean the user is offline...
      setIsOffline(!snap.val())
      console.log('Connection state -> ', snap.val() ? 'online' : 'offline')
    },
    2000
  )

  // Listen for connection changes
  useEffect(() => {
    const rtdb = getDatabase()
    const connectedRef = ref(rtdb, '.info/connected')

    onValue(connectedRef, offlineDebounce)
  }, [offlineDebounce])

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user: User | null) => {
      setCurrentUser(user)
      setLoading(false)
      console.log(user)
    })

    return unsubscribe
  }, [])

  // Get the user from cache or server (if uid exists)
  useEffect(() => {
    const uid = currentUser?.uid

    async function getUser() {
      try {
        if (!uid) return

        setGettingUser(true)

        const cacheSnap = await getDocFromCache(doc(db, 'users', uid))

        if (cacheSnap.exists()) {
          setSuperUser(cacheSnap.data() as UserDocument)
        }
      } catch (e) {
        const noDataOnCache = (e as Error).message.match(
          'Failed to get document from cache'
        )?.[0]

        if (noDataOnCache && !isOffline) {
          getUserFromServer()
        }

        console.error((e as Error).message)
      }
    }

    async function getUserFromServer() {
      try {
        if (!uid) return

        const serverSnap = await getDocFromServer(doc(db, 'users', uid))

        if (serverSnap.exists()) setSuperUser(serverSnap.data() as UserDocument)
      } catch (e) {
        console.error((e as Error).message)
      } finally {
        setGettingUser(false)
      }
    }

    getUser()
  }, [currentUser?.uid, isOffline])

  const value = useMemo(
    () => ({
      currentUser,
      loading,
      superUser,
      gettingUser,
      isOffline
    }),
    [loading, currentUser, superUser, gettingUser, isOffline]
  )

  const messagesStyles = {
    color: 'var(--moderate-blue)',
    position: 'fixed',
    top: '65%',
    left: '50%',
    transform: 'translate(-50%, -25%)',
    fontSize: 'var(--fs-small)'
  }

  return !loading ? (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  ) : (
    currentUser && (
      <>
        <AppSpinner onAnimationEnd={() => setShowLoadingText(true)} />
        <Box sx={messagesStyles} className='text-center'>
          {showLoadingText && t.fetching}
          {isOffline && t.cantFetch}
        </Box>
      </>
    )
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
