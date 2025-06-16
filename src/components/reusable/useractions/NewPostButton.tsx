import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import type { UserInteraction } from '../../../interfaces/posts.d.ts'
import type { KeyboardEvent } from 'react'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '../buttons/IconButton.tsx'

export default function NewPostButton() {
  const navigate = useNavigate()

  function handleNewPostClick(e: UserInteraction<HTMLButtonElement>) {
    if (
      (e.type === 'keydown' && (e as KeyboardEvent).key !== 'Enter') ||
      e.type !== 'click'
    )
      return

    navigate('/new')
  }

  return (
    <IconButton
      icon={<AddIcon />}
      className='new-post-btn'
      aria-label='Create new post'
      onClick={handleNewPostClick}
      onKeyDown={handleNewPostClick}
    />
  )
}
