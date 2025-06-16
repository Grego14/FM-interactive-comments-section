import { Button } from '@mui/material'
import {
  type ChangeEvent,
  type FormEvent,
  useState,
} from 'react'
import AppLogo from '../../components/reusable/AppLogo'
import { signUp } from '../../firebase/auth.ts'
import './auth.css'
import { type User, fetchSignInMethodsForEmail } from 'firebase/auth'
import {
  type Timestamp,
  doc,
  serverTimestamp,
  setDoc
} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { AppTheme, useApp } from '../../App.js'
import LoginButton from '../../components/reusable/auth/LoginButton.js'
import { auth, db } from '../../firebase/firebase-config.ts'
import toast from '../../toast.js'
import getFriendlyAuthError from '../../utils/getFriendlyAuthError.js'
import { LanguageKey } from '../../translations.ts'
import useTranslations from '../../hooks/useTranslations.tsx'

export interface UserDocument {
  uid: string
  email: string
  avatar: string
  username: string
  lang: LanguageKey,
  theme: AppTheme

  postingSince: Date | Timestamp
  lastActivity: Timestamp

  totalPosts: number
  postsVotes: {
    up: number
    down: number
  }

  followersCount: number
  followingCount: number

  followers: { [uid: string]: boolean }
  following: { [uid: string]: boolean }
  bio: string
  website: string
  frontendMentor: string

  notifications: [
    {
      title: string
      description: string
      read: boolean
      createdAt: string
    }
  ]
  unreadNotifications: number

  isPrivate: boolean
}

export default function SignUp() {
  const t = useTranslations()
  const navigate = useNavigate()
  const { screenType } = useApp()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [fetchingUser, setFetchingUser] = useState(false)

  function handleInputs(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target.name
    const value = e.target.value

    if (input === 'email') {
      setEmail(value.trim())
      return
    }

    setPassword(value.trim())
  }

  function handleNewAccountCreation(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const errors = t.auth.signUp.errors

    const error = (() => {
      const splittedEmail = email.split(/[@.]/)
      const atSigns = email.match('@')?.[0]

      if (!password && !email) return errors.emptyFields

      if (!email) return errors.emptyEmail

      if (!password) return errors.emptyPassword

      if (!atSigns || splittedEmail.length < 3) return errors.emailStructure

      if (splittedEmail[0].length < 6) return errors.shortEmail

      if (atSigns.length > 1) return errors.atSigns

      if (splittedEmail[2].length < 2) return errors.shortTLD

      if (password.length < 8) return errors.shortPassword

      return ''
    })()

    setError(error)

    if (!error) handleSignUp()
  }

  async function handleSignUp() {
    if (error) return

    try {
      setFetchingUser(true)

      const methods = await fetchSignInMethodsForEmail(auth, email)

      if (methods.length > 0) {
        toast({ content: t.auth.signUp.accountExists })
        return
      }

      const signUpData: User = await signUp(email, password)

      if (signUpData) {
        await setDoc(doc(db, 'users', signUpData.uid), {
          uid: signUpData.uid,
          email: signUpData.email,
          avatar: signUpData.photoURL,
          username: 'New user',

          postingSince: signUpData.metadata.creationTime
            ? new Date(signUpData.metadata.creationTime)
            : serverTimestamp(),
          lastActivity: serverTimestamp(),

          totalPosts: 0,
          postsVotes: {
            up: 0,
            down: 0
          },

          followersCount: 0,
          followingCount: 0,

          followers: {},
          following: {},
          bio: '',
          website: '',
          frontendMentor: '',

          notifications: [
            {
              title: t.notifications.newAccount.title,
              description: t.notifications.newAccount.description,
              read: false,
              createdAt: new Date().toISOString()
            }
          ],
          unreadNotifications: 1,

          isPrivate: false
        } as UserDocument)

        navigate('/profile')
      }
    } catch (err) {
      const error = getFriendlyAuthError((err as Error).message)

      toast({
        content: error.message,
        type: 'error'
      })
    } finally {
      console.log('ended')
      setFetchingUser(false)
    }
  }
  console.log(screenType)

  return <div className='auth-container flex'>
    {screenType === 'mobile' && <AppLogo />}

    <div className='auth'>
      {screenType !== 'mobile' &&
        <div className='auth__left-box flex'>
          <AppLogo theme='dark' />
          <p>Where your posts live!</p>
        </div>
      }

      <div className='auth__box'>
        <h2 className='auth__title'>{t.auth.signUp.title}</h2>

        <form
          onSubmit={handleNewAccountCreation}
          className='auth__form flex'
          noValidate>
          <div className='auth__form-group flex'>
            <label htmlFor='email' className='auth__form__label'>
              {t.auth.labels.email}
            </label>
            <input
              className='auth__form__input'
              type='email'
              id='email'
              name='email'
              value={email}
              placeholder='username@domain.tld'
              onChange={handleInputs}
              autoComplete='email'
              required
            />
          </div>

          <div className='auth__form-group flex'>
            <label htmlFor='password' className='auth__form__label'>
              {t.auth.labels.password}
            </label>
            <input
              className='auth__form__input'
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='m1_pa55w0rd!'
              onChange={handleInputs}
              autoComplete='new-password'
              required
            />
          </div>

          <span aria-live='polite' className='auth__error'>
            {error}
          </span>

          <Button
            disabled={fetchingUser}
            disableElevation={true}
            variant='contained'
            type='submit'
            className='auth__button auth__button--new-account'>
            {t.auth.signUp.createAccount}
          </Button>
        </form>
      </div>
    </div>
  </div>
}
