import { useNavigate } from 'react-router-dom'
import type { UserInteraction } from '../../../interfaces/posts.d.ts'
import type { KeyboardEvent } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '../buttons/IconButton.tsx'

export default function SearchButton() {
  const navigate = useNavigate()

  function handleSearchInteraction(e: UserInteraction<HTMLButtonElement>) {
    if (
      (e.type === 'keydown' && (e as KeyboardEvent).key !== 'Enter') ||
      e.type !== 'click'
    )
      return

    navigate('/search')
  }

  return (
    <IconButton
      icon={<SearchIcon />}
      className='search-btn'
      aria-label='Search posts or users'
      onClick={handleSearchInteraction}
      onKeyDown={handleSearchInteraction}
    />
  )
}
