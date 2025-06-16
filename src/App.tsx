import './App.css'
import { Suspense, createContext, lazy, useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Slide, ToastContainer } from 'react-toastify'
import Nav from './components/reusable/nav/Nav'
import { useAuth } from './firebase/context/AuthContext.js'
import useScreenType, { type ScreenType } from './hooks/useScreenType'
import type { LanguageKey } from './translations.js'
import AppRoutes from './AppRoutes'

const UserActions = lazy(
  () => import('./components/reusable/useractions/UserActions')
)
const OffLineBanner = lazy(
  () => import('./components/reusable/appbanners/OffLineBanner')
)
const NotEmailVerifiedBanner = lazy(
  () => import('./components/reusable/appbanners/NotEmailVerifiedBanner')
)

export type AppTheme = 'light' | 'dark'

interface AppContextProps {
  theme: AppTheme
  screenType?: ScreenType
  lang: LanguageKey
  updateTheme: (theme: AppTheme) => void
}

export const AppContext = createContext<AppContextProps>({
  theme: 'light',
  screenType: 'mobile',
  lang: 'en',
  updateTheme: () => { }
})

export default function App() {
  const currentPath = useLocation().pathname
  const { currentUser, isOffline, superUser } = useAuth()

  const screenType = useScreenType()
  const [theme, setTheme] = useState<AppTheme>((localStorage.getItem('theme') as AppTheme))
  const [lang, setLang] = useState<LanguageKey>((localStorage.getItem('lang') as LanguageKey))

  useEffect(() => {
    const newLang = superUser?.lang || (localStorage.getItem('lang') || 'en') as LanguageKey
    const newTheme = superUser?.theme || (localStorage.getItem('theme') || 'light') as AppTheme

    setLang(newLang)
    setTheme(newTheme)
    localStorage.setItem('lang', newLang)
    localStorage.setItem('theme', newTheme)
  }, [superUser])

  const appContextValue = {
    theme,
    updateTheme: setTheme,
    lang: lang,
    screenType: screenType
  }

  const showVerifyEmailBanner =
    currentUser && !currentUser?.emailVerified && currentPath !== '/verify'

  return (
    <AppContext.Provider value={appContextValue}>
      <Suspense fallback={null}>
        {currentUser && <Nav />}

        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          transition={Slide}
        />

        <div className={`app-page${currentUser ? ' --user' : ''}`}>
          {currentUser && isOffline && <OffLineBanner />}
          {currentUser && showVerifyEmailBanner && <NotEmailVerifiedBanner />}

          <AppRoutes />
        </div>

        {currentUser && screenType === 'mobile' && <UserActions />}
      </Suspense>
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
