import { useEffect, memo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

interface RestrictedRuteProps {
  isAuthenticated: boolean
  restrictedPaths: string[]
}

export default memo(function RestrictedRute({
  isAuthenticated,
  restrictedPaths
}: RestrictedRuteProps) {
  const navigate = useNavigate()
  const currentLocation = useLocation()
  const currentPath = currentLocation.pathname

  useEffect(() => {
    if (!isAuthenticated)
      navigate(currentPath === '/signup' ? '/signup' : '/login')

    if (isAuthenticated && restrictedPaths.includes(currentPath)) navigate('/')
  }, [restrictedPaths, navigate, isAuthenticated, currentPath])

  return <Outlet />
})
