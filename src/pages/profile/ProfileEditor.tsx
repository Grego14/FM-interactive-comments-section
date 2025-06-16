import useTranslations from '../../hooks/useTranslations'
import { useAuth } from '../../firebase/context/AuthContext'
import UserAvatar from '../../components/reusable/UserAvatar'
import ToggleButton from '@mui/material/ToggleButton'
import Button from '@mui/material/Button'
import './ProfileEditor.css'
import { useRef } from 'react'

export default function ProfileEditor() {
  const { currentUser, superUser } = useAuth()
  const t = useTranslations()

  if (!superUser) return <div>Loading...</div>

  const fileInputRef = useRef(null)

  function handleAvatarChange(e) {
    console.log(e)
  }

  return (
    <form className='form'>
      <div className='form__group form__group--avatar'>
        <label htmlFor='avatar'>{t.profile.editor.labels.avatar}</label>
        <div className='form__avatar-container'>
          <UserAvatar
            userAvatar={superUser?.avatar}
            id='avatar'
            className='form__avatar'
            size='100'
            aria-label='Your profile photo. Press to change to another one'
            onClick={() =>
              fileInputRef.current &&
              (fileInputRef.current as HTMLInputElement)?.click()
            }
          />
        </div>
        <p className='form__avatar-text' aria-live='polite'>
          Supported filetypes: .png, .jpg, .jpeg.
        </p>

        <input
          ref={fileInputRef}
          className='form__avatar-input'
          type='file'
          aria-hidden='true'
          tabIndex={-1}
        />
      </div>

      <div className='form__group form__group--username'>
        <label htmlFor='username'>
          {t.profile.editor.labels.username}
          <input
            type='text'
            name='username'
            id='username'
            defaultValue={currentUser?.displayName || 'New User'}
          />
        </label>
      </div>

      <div className='form__group form__group--email'>
        <label htmlFor='email'>
          {t.profile.editor.labels.email}
          <input
            type='email'
            name='email'
            id='email'
            defaultValue={currentUser?.email || ''}
          />
        </label>
      </div>

      <div className='form__group form__group--bio'>
        <label htmlFor='bio'>
          {t.profile.editor.labels.bio}
          <textarea
            name='bio'
            id='bio'
            cols={30}
            rows={10}
            placeholder={t.profile.editor.bioPlaceholder}
            defaultValue={superUser.bio}
          />
        </label>
      </div>

      <div className='form__group form__group--website'>
        <label htmlFor='website'>
          {t.profile.editor.labels.website}
          <input
            name='website'
            id='website'
            type='text'
            placeholder={t.profile.editor.websitePlaceholder}
          />
        </label>
      </div>

      <div className='form__group form__group--frontendmentor'>
        <p>{t.profile.editor.frontendMentorText}</p>

        <label htmlFor='frontendmentor'>
          {t.profile.editor.labels.frontendmentor}
          <input
            name='frontendmentor'
            id='frontendmentor'
            type='text'
            placeholder={t.profile.editor.frontendMentorPlaceholder}
          />
        </label>
      </div>

      <div className='form__group form__group--private'>
        <ToggleButton value={superUser.isPrivate}>
          {superUser.isPrivate
            ? t.profile.editor.togglePublic
            : t.profile.editor.togglePrivate}
        </ToggleButton>
        <p className='form__private-text'>{t.profile.editor.privateText}</p>
      </div>

      <Button className='form__save-btn' variant='contained'>
        {t.common.save}
      </Button>
    </form>
  )
}
