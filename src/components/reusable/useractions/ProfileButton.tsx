import { Link } from 'react-router-dom'
import { useAuth } from '../../../firebase/context/AuthContext'
import UserAvatar from '../../../components/reusable/UserAvatar'

export default function ProfileButton() {
  const { currentUser } = useAuth()

  return (
    <Link
      to='/profile'
      className='profile-button'
      aria-label='Go to my profile'>
      <UserAvatar
        size='35'
        className='profile-button__avatar'
        userAvatar={currentUser?.photoURL || ''}
        aria-hidden='true'
      />
    </Link>
  )
}
