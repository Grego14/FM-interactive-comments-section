import { useState, useReducer, useRef, useEffect, useActionState } from "react"
import useTranslations from "../../hooks/useTranslations"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import IconButton from "../../components/reusable/buttons/IconButton"
import GithubIcon from '@mui/icons-material/GitHub'
import GoogleIcon from '@mui/icons-material/Google'
import formDataReducer, {formDataInitialValue, type FormState} from './authFormReducer'
import { signIn } from '../../firebase/auth.ts'
import { useForm } from 'react-hook-form'

interface AuthProps {
  type: 'login' | 'signup';
}

type FormData = {
  username?: string,
  email: string,
  password: string
}

export default function Auth({ type = 'login' }: AuthProps){
  const navigate = useNavigate()

  const t = useTranslations()
  const typeTranslations = t.auth[type]

  const {register, handleSubmit, formState: {errors}} = useForm<FormData>()

  const [formData, dispatch] = useReducer(formDataReducer, formDataInitialValue)
  const usernameErrorRef = useRef(null)
  const emailErrorRef = useRef(null)
  const passwordErrorRef = useRef(null)

  const isSignup = type === 'signup'
  const formIsInvalid = Object.values(formData).some(data => data.error)

  const [state, checkFieldsAndLogIn, isPending] = useActionState(async (e) => {
    const submitHandled = e
    console.log(submitHandled)

    if(!isSignup) {
      // ... set the username
      return
    }

    //const logIn = await signIn(formData.email.value, formData.password.value)

    //if(logIn) console.log('User logged', logIn)
  }, formData)

  useEffect(() => {
    const refs = {
      username: usernameErrorRef,
      email: emailErrorRef,
      password: passwordErrorRef
    }

    if(formIsInvalid){
      // Iterate over all error fields. Stop on the first that has an error.
      // Focus the one that has an error. (we need the field name to do this).
      for (const [key, value] of Object.entries(formData)) {
        console.log(key, value)
      }
    }
  }, [formData, formIsInvalid])

  const onSubmit = handleSubmit((data) => console.log(data))

  return (<form className='auth' noValidate onSubmit={onSubmit} action={handleSubmit}>
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
          <input 
            type="text" 
            placeholder='Username' 
            {...register('username')} 
            aria-invalid={errors.username ? 'true' : 'false'} />
          {errors.username && <span aria-live="assertive">{errors.username.message}</span>}
        </div>
      )}

      <div className='auth__field__group'>
        <input 
          type="text" 
          placeholder='Email' 
          {...register('email', {required: true})} 
          aria-invalid={errors.email ? 'true' : 'false'} />
        {errors.email && <span aria-live="assertive">{errors.email.message}</span>}
      </div>

      <div className='auth__field__group'>
        <input 
          type="password" 
          required 
          placeholder='Password' 
          {...register('password', {required: true, minLength: 6})} 
          aria-invalid={errors.password ? 'true' : 'false'}/>
        {errors.password && <span aria-live="assertive">{errors.password.message}</span>}
      </div>

      {!isSignup && (
      <div className='auth__fields__actions'>
        <div className='auth__field__group'>
          <input type='checkbox' defaultChecked name='remember-me'/>
          <label htmlFor='remember-me'>{t.auth.login.remember}</label>
        </div>

        <Link to='/recover-password'>{t.auth.login.recoverPassword}</Link>
      </div>
      )}
    </div>

    <div className='auth__buttons'>
      <Button type='submit' disabled={isPending}>{typeTranslations.authButton}</Button>

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
