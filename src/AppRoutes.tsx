import { useAuth } from './firebase/context/AuthContext'
import { useMemo, lazy, useEffect, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import ProtectedRoute from './components/reusable/auth/ProtectedRute'
import Home from './pages/home/Home'
import { AppContext } from './App'

const NotFound = lazy(() => import('./pages/404/NotFound'))
const LogIn = lazy(() => import('./pages/auth/LogIn'))
const SignUp = lazy(() => import('./pages/auth/SignUp'))
const NewPost = lazy(() => import('./pages/newpost/NewPost'))
const Profile = lazy(() => import('./pages/profile/Profile'))
const ProfileEditor = lazy(() => import('./pages/profile/ProfileEditor'))
const RestrictedRoute = lazy(
  () => import('./components/reusable/auth/RestrictedRute')
)
const PostPreview = lazy(() => import('./pages/posts/PostPreview'))

export default function AppRoutes() {
  const { currentUser } = useAuth()
  const { superUser } = useContext(AppContext)
  const restrictedPaths = useMemo(() => ['/login', '/signup'], [])

  useEffect(() => {
    console.log(
      'Is authenticated? => ',
      Boolean(currentUser),
      currentUser,
      superUser
    )
  }, [currentUser, superUser])

  return (
    <Routes>
      <Route path='/' element={<Home />} />

      {/* User must not be logged to be able to access this rutes */}
      <Route
        element={
          <RestrictedRoute
            isAuthenticated={Boolean(currentUser)}
            restrictedPaths={restrictedPaths}
          />
        }>
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Route>
      {/* <-----------------------------------------------------> */}

      {/* User must be logged to be able to access this rutes */}
      <Route
        element={<ProtectedRoute isAuthenticated={Boolean(currentUser)} />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/edit' element={<ProfileEditor />} />
        <Route path='/new' element={<NewPost />} />
      </Route>
      {/* <-------------------------------------------------> */}

      <Route path='/profile/:profileId' element={<Profile />} />
      <Route path='/posts/:postId' element={<PostPreview />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
