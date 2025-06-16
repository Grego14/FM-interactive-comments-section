import LoginButton from './LoginButton'
import privateIcon from '/images/icon-private.svg'
import { Outlet } from 'react-router-dom'

export default function ProtectedRoute({
  isAuthenticated
}: { isAuthenticated: boolean }) {
  if (!isAuthenticated) {
    return (
      <div className='protected-rute'>
        <img
          width='120'
          height='120'
          src={privateIcon}
          alt=''
          aria-hidden='true'
        />

        <div className='protected-rute__text text-center'>
          <h2 className='protected-rute__text__title'>Access required</h2>
          <p className='protected-rute__text__desc'>
            You must log in to access this page.
          </p>
        </div>
        <LoginButton variant='contained' />
      </div>
    )
  }

  return <Outlet />
}
