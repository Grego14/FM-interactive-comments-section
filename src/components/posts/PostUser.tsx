import type { PostUserProps } from '../../interfaces/posts.d.ts'
import { useAuth } from '../../firebase/context/AuthContext.tsx'
import { Link } from 'react-router-dom'
import UserAvatar from '../reusable/UserAvatar.tsx'
import hideCharsAt from '../../utils/hideCharsAt.js'
import { useContext } from 'react'
import { AppContext } from '../../App.tsx'

export default function PostUser({
  authorName,
  authorAvatar,
  authorId
}: PostUserProps) {
  const { currentUser } = useAuth()
  const { screenType } = useContext(AppContext)
  const isMobile = screenType === 'mobile'

  const userAvatarClass =
    authorId === currentUser?.uid ? ' user__avatar--currentUser' : ''
  const responsiveName =
    isMobile && authorName.length > 18
      ? `${hideCharsAt(authorName, 15)}...`
      : authorName

  return (
    <div className='post__user'>
      <Link
        className='post__user__link flex'
        to={
          authorId === currentUser?.uid ? '/profile' : `/profile/${authorName}`
        }>
        <div className='user__avatar-container'>
          <UserAvatar
            className={`user__avatar${userAvatarClass}`}
            userAvatar={authorAvatar}
            alt={`${authorName} avatar`}
          />
        </div>
        <div className='user__name-container flex'>
          <span className='user__name'>{responsiveName}</span>
          {currentUser?.uid === authorId && (
            <span className='user__name__you'>you</span>
          )}
        </div>
      </Link>
    </div>
  )
}
