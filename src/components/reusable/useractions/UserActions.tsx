import './UserActions.css'
import ProfileButton from './ProfileButton'
import NewPostButton from './NewPostButton'
import SearchButton from './SearchButton'

export default function UserActions() {
  return (
    <div className='user-actions'>
      <div className='user-actions__box'>
        <SearchButton />
        <NewPostButton />
        <ProfileButton />
      </div>
    </div>
  )
}
