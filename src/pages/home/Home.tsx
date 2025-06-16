import './home.css'
import { Suspense, lazy } from 'react'
import { useAuth } from '../../firebase/context/AuthContext'

const HomeLoggedContent = lazy(() => import('./HomeLoggedContent'))
const HomeNoLoggedContent = lazy(() => import('./HomeNoLoggedContent'))

export default function Home() {
  const { currentUser } = useAuth()

  return (
    <div className='home'>
      <Suspense>
        {currentUser ? (
          <HomeLoggedContent />
        ) : (
          <>
            <div className='home__content'>
              <h1 className='home__title text-center text-balance'>
                Interactive Comments Section
              </h1>
              <HomeNoLoggedContent />
            </div>
          </>
        )}
      </Suspense>
    </div>
  )
}
