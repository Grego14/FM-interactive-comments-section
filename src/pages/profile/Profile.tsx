import './profile.css'
import Button from '@mui/material/Button'
import type { User } from 'firebase/auth'
import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference
} from 'firebase/firestore'
//import { useLocation } from 'react-router-dom'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
//import toast from '../toast/toast'
import UserAvatar from '../../components/reusable/UserAvatar'
import LogoutButton from '../../components/reusable/auth/LogoutButton'
import DropdownMenu from '../../components/reusable/dropdownmenu/DropdownMenu'
import { useAuth } from '../../firebase/context/AuthContext'
import useTranslations from '../../hooks/useTranslations'
import ProfilePosts from './ProfilePosts'
import { db } from '../../firebase/firebase-config.ts'
import useDebounce from '../../hooks/useDebounce.tsx'
import { UserDocument } from '../auth/SignUp.tsx'

export default function Profile() {
  const { currentUser, superUser } = useAuth()

  if (!currentUser) return <div>Loading...</div>

  if (!superUser) {
    // TODO - Make a hook to fetch data from another user if
    // the profileId isn't empty
    //const location = useLocation()
    //const profileId = location.pathname.match(/[^\/profile\/].*/)?.[0]
  }

  function getPostingDate(): Date {
    const date = superUser?.postingSince

    return date instanceof Date
      ? date
      : (date?.toDate?.() ?? new Date(currentUser?.metadata.creationTime || ''))
  }

  const profileStatsProps = {
    totalPosts: superUser?.totalPosts,
    postsVotes: superUser?.postsVotes,
    postingSince: getPostingDate()
  }

  return (
    <div className='profile'>
      <div className='profile__data'>
        <ProfileActions user={currentUser} />

        <div className='profile__avatar-container'>
          <UserAvatar
            size='150'
            className='profile__avatar'
            userAvatar={currentUser.photoURL || ''}
            alt='Your profile avatar'
          />
        </div>
        <div className='profile__user__data'>
          <h2 className='profile__name'>
            {currentUser.displayName || 'New user'}
          </h2>
          <p className='profile__email'>{currentUser.email}</p>
          <ProfileStats {...profileStatsProps} />
        </div>
      </div>

      <ProfilePosts />
    </div>
  )
}

function ProfileStats({
  totalPosts = 0,
  postsVotes = { up: 0, down: 0 },
  postingSince
}: {
  totalPosts?: number
  postsVotes?: {
    up: number
    down: number
  }
  postingSince: Date
}) {
  const { lang } = useContext(AppContext)
  const t = useTranslations().profile.stats

  const formatedDate = new Intl.DateTimeFormat(
    lang === 'en' ? 'en-US' : 'es-MX',
    {
      month: 'short',
      weekday: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }
  ).format(postingSince)

  return (
    <div className='profile__stats'>
      <div className='stat-card'>
        <span className='stat-card__label'>{t.totalPosts}</span>
        <span className='stat-card__value'>{totalPosts}</span>
      </div>
      <div className='stat-card'>
        <span className='stat-card__label'>{t.upvotes}</span>
        <span className='stat-card__value'>{postsVotes.up}</span>
      </div>
      <div className='stat-card'>
        <span className='stat-card__label'>{t.downvotes}</span>
        <span className='stat-card__value'>{postsVotes.down}</span>
      </div>
      <div className='stat-card'>
        <span className='stat-card__label'>{t.postingSince}</span>
        <span className='stat-card__value'>{formatedDate}</span>
      </div>
    </div>
  )
}

function ProfileActions({ user }: { user: User | null }) {
  const { theme, updateTheme, lang } = useContext(AppContext)
  const t = useTranslations().profile.menu
  const navigate = useNavigate()
  const [userTheme, setUserTheme] = useState(theme)
  const [userLang, setUserLang] = useState(lang)

  // prevent doing lots of updates
  // TODO - Look for a better way to do this...
  const [_, debounce] = useDebounce<{ userTheme?: string; userLang?: string }>(
    async ({ userTheme, userLang }): Promise<DocumentReference> => {
      return new Promise((resolve, reject) => {
        if (!user?.uid || (userTheme === theme && userLang === lang))
          return reject('Error while updating the theme or language.')

        return resolve(
          addDoc(collection(db, 'users', user.uid), { theme, lang })
        )
      })
    },
    1500
  )

  function handleThemeChange() {
    const newTheme = theme === 'dark' ? 'light' : 'dark'

    setUserTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  function handleLanguageChange() {
    const newLang = lang === 'en' ? 'es' : 'en'

    localStorage.setItem('lang', newLang)

    debounce({ userLang }).then(() => {
      window.location.reload()
    })
  }

  function updateUserThemeAndLanguage() {
    return debounce({ userTheme, userLang })
  }

  return (
    <DropdownMenu
      onClose={updateUserThemeAndLanguage}
      label={open => `${open ? 'Close' : 'Open'} profile actions`}
      className='profile-actions flex'>
      <Button onClick={() => navigate('/profile/edit')}>{t.edit}</Button>
      <Button onClick={() => navigate('/profile/config')}>{t.settings}</Button>
      <Button onClick={handleThemeChange}>{t.theme[theme]}</Button>
      <Button onClick={handleLanguageChange}>{t.lang}</Button>
      <LogoutButton variant='text' />
    </DropdownMenu>
  )
}
