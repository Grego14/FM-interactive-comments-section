import { useNavigate } from 'react-router-dom'
import type { UserInteraction } from '../../interfaces/posts.d.ts'
import type { KeyboardEvent } from 'react'
import Button from '@mui/material/Button'

export default function PostTags({ tags }: { tags: string[] }) {
  const navigate = useNavigate()

  function handleTagInteraction(e: UserInteraction<HTMLSpanElement>) {
    const value = e.currentTarget.textContent

    if (
      (e.type === 'keydown' && (e as KeyboardEvent).key === 'Enter') ||
      e.type === 'click'
    ) {
      navigate(`/search?tags=${value}`)
    }
  }

  // TODO
  return (
    tags.length > 0 && (
      <div className='post__tags flex'>
        {tags.map(tag => (
          <Button
            variant='outlined'
            sx={{ fontSize: '.65rem' }}
            key={tag}
            className='post__tag'
            onClick={handleTagInteraction}
            onKeyDown={handleTagInteraction}>
            {tag}
          </Button>
        ))}
      </div>
    )
  )
}
