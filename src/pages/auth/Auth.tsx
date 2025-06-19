import { useState, useReducer } from "react"
import useTranslations from "../../hooks/useTranslations"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import IconButton from "../../components/reusable/buttons/IconButton"
import GithubIcon from '@mui/icons-material/GitHub'
import GoogleIcon from '@mui/icons-material/Google'

interface AuthProps {
  type: 'login' | 'signup';
}

interface FormDataFields {
  username: {
    value: string,
    error: string
  }
  email: {
    value: string,
    error: string
  }
  password: {
    value: string,
    error: string
  }
}

const formDataInitialValue: FormDataFields = {
  username: {
    value: '',
    error: ''
  },
  email: {
    value: '',
    error: ''
  },
  password: {
    value: '',
    error: ''
  },
}

function formDataReducer(state, action){
  const funcs = {
    setError,
    setValue
  }

  // Sets an error to the specified field
  function setError({field, error}: {field: keyof FormDataFields, error: string}) {
    return {...state, [field]: {value: state[field.value], error}}
  }

  function setValue({field, error}: {field: keyof FormDataFields, error: string}) {
    return {...state, [field]: {value: state[field.value], error}}
  }

  return funcs[action.type]() || state
}

export default function Auth({ type = 'login' }: AuthProps){
  const navigate = useNavigate()

  const t = useTranslations()
  const typeTranslations = t.auth[type]

  const [formData, dispatch] = useReducer(formDataReducer, formDataInitialValue)

  // TODO - Implement use of useReducer to save all this states in one object
  const [usernameError, setUsernameError] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [loading, setLoading] = useState(false)
  // ------------------------------------------------------------------------

  const isSignup = type === 'signup'
  const formIsInvalid = Boolean(usernameError || emailError || passwordError)

  // TODO - Focus the error span element when there's an 
  // error in one of the inputs.

  return (<form className='auth' noValidate>
    <h2 className='auth__title-first'>{typeTranslations.title[0]}</h2>
    <h2 className='auth__title-last'>{typeTranslations.title[1]}</h2>

    <h4 className='auth__text'>
      {Array.isArray(typeTranslations.text) 
        ? <>
            {typeTranslations.text[0]}{' '}
            <span className='auth__text__special'>{typeTranslations.text[1]}</span>
          </>
        : typeTranslations.text}
    </h4>

    <div className='auth__fields'>

      {isSignup && (
        <div className='auth__field__group'>
          <input type="text" name='username' required placeholder='Username'/>
          {usernameError && <span aria-live="assertive">{usernameError}</span>}
        </div>
      )}

      <div className='auth__field__group'>
        <input type="text" name='email' required placeholder='Email'/>
        {emailError && <span aria-live="assertive">{emailError}</span>}
      </div>

      <div className='auth__field__group'>
        <input type="password" name='password' required placeholder='Password'/>
        {passwordError && <span aria-live="assertive">{passwordError}</span>}
      </div>

      {!isSignup && (
      <div className='auth__fields__actions'>
        <div className='auth__field__group'>
          <input type='checkbox' checked name='remember-me' />
          <label htmlFor='remember-me'>{t.auth.login.remember}</label>
        </div>

        <Link to='/recover-password'>{t.auth.login.recoverPassword}</Link>
      </div>
      )}
    </div>

    <div className='auth__buttons'>
      <Button type='submit' disabled={loading || formIsInvalid}>{typeTranslations.authButton}</Button>

      <div>{t.auth.or}</div>

      <div className='auth__buttons__providers'>
        <IconButton icon={<GithubIcon/>} text={t.auth.githubButton} />
        <IconButton icon={<GoogleIcon/>} text={t.auth.googleButton} />
      </div>
    </div>

    <div className='auth__account-text'>
      {typeTranslations.accountText}
      {isSignup 
        ? <Button onClick={() => navigate('/signup')}>{t.common.login}</Button>
        : <Button onClick={() => navigate('/login')}>{t.common.signup}</Button> 
      }
    </div>
  </form>)
}
