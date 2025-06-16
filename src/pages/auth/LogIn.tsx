import {
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
  useEffect,
  useState
} from 'react'
import IconButton from '../../components/reusable/buttons/IconButton'
import {
  auth,
  githubProvider,
  googleProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from '../../firebase/firebase-config.ts'
import './auth.css'
import GithubIcon from '@mui/icons-material/GitHub'
import GoogleIcon from '@mui/icons-material/Google'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import AppLogo from '../../components/reusable/AppLogo'
import SignUpButton from '../../components/reusable/auth/SignUpButton'
import useTranslations from '../../hooks/useTranslations.tsx'
import toast from '../../toast.js'
import getFriendlyAuthError from '../../utils/getFriendlyAuthError.js'

interface InputFunctions {
  email: (value: string) => void
  password: (value: string) => void
}

export default function LogIn() {
  const t = useTranslations()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (error) {
      console.error(error)
      toast({ content: getFriendlyAuthError(error).message, type: 'error' })
    }
  }, [error])

  function resetErrorAndStartLoading() {
    setError('')
    setLoading(true)
  }

  async function handleLogin(
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault()
    resetErrorAndStartLoading()

    const loginSource = (e.currentTarget as HTMLFormElement | HTMLButtonElement)
      .dataset.source

    try {
      switch (loginSource) {
        case 'email':
          await signInWithEmailAndPassword(auth, email, password)
          break

        case 'google':
          await signInWithPopup(auth, googleProvider)
          break

        case 'github':
          await signInWithPopup(auth, githubProvider)
          break

        default:
          throw Error(`Invalid login source -> ${loginSource}`)
      }

      navigate('/')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  function handleInputs(e: ChangeEvent<HTMLInputElement>) {
    const funcs: InputFunctions = {
      email: setEmail,
      password: setPassword
    }

    const target = e.target
    const inputName = target.name as keyof InputFunctions

    funcs[inputName](target.value)
  }

  return (
    <div className='auth-container flex'>
      <div className='auth__logo'>
        <AppLogo />
      </div>

      <div className='auth'>
        <h2 className='auth__title'>{t.login.title}</h2>

        {loading && <div>Waiting...</div>}

        <form onSubmit={handleLogin} className='auth__form flex' data-source='email'>
          <div className='auth__form-group flex'>
            <label htmlFor='email' className='auth__form__label'>
              {t.login.labels.email}
            </label>
            <input
              className='auth__form__input'
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={handleInputs}
              required
            />
          </div>

          <div className='auth__form-group flex'>
            <label htmlFor='password' className='auth__form__label'>
              {t.login.labels.password}
            </label>
            <input
              className='auth__form__input'
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={handleInputs}
              required
            />
          </div>

          <Button
            sx={{ fontWeight: 'bold' }}
            variant='contained'
            type='submit'
            className='auth__button auth__button--email'
            disabled={loading}>
            {t.login.btnEmail}
          </Button>
        </form>

        <div className='auth__social-buttons flex'>
          <IconButton
            sx={{ backgroundColor: 'var(--btn-google-bg)', color: 'var(--white)' }}
            variant='outlined'
            icon={<GoogleIcon />}
            text={t.login.btnGoogle}
            onClick={handleLogin}
            disabled={loading}
            className='auth__button auth__button--google'
            data-source='google'
          />

          <IconButton
            sx={{ backgroundColor: 'var(--btn-github-bg)', color: 'var(--white)' }}
            variant='outlined'
            icon={<GithubIcon />}
            text={t.login.btnGithub}
            onClick={handleLogin}
            disabled={loading}
            className='auth__button auth__button--github'
            data-source='github'
          />
        </div>

        <div className='auth__footer flex'>
          <div className='auth__no-account text-center'>
            <div className='no-account__text'>{t.login.noAccount}</div>
            <SignUpButton variant='text' />
          </div>

          <Button className='auth__password-recuperate'
            onClick={() => navigate('/recuperate')}>
            {t.login.recuperate}
          </Button>
        </div>
      </div>
    </div>
  )
}
