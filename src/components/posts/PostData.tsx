import IconButton from '../reusable/buttons/IconButton'
import { useState, type KeyboardEvent } from 'react'
import './PostData.css'
import Button from '@mui/material/Button'
import type { UserInteraction } from '../../interfaces/posts.d.ts'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'

export default function PostData({ tags }: { tags: string[] }) {
  const navigate = useNavigate()
  const [headerDataPopupVisible, setHeaderDataPopupVisible] = useState(false)

  // TODO - Move this function to /utils folder
  function searchPostsByTag(tag: string) {
    navigate(`/search?tags=${tag}`)
  }

  function handleHeaderDataPopupVisibility(
    e: UserInteraction<HTMLDivElement | HTMLButtonElement>
  ) {
    if (e.type === 'keydown' && (e as KeyboardEvent).key !== 'Enter') return

    setHeaderDataPopupVisible(state => !state)
  }

  return (
    <>
      <IconButton
        onClick={handleHeaderDataPopupVisibility}
        className='post__data-button'
        icon={<MenuIcon />}
        size={30}
        aria-label='Press to see post data'
      />
      {headerDataPopupVisible && (
        <div className='post__data'>
          <div
            onKeyDown={handleHeaderDataPopupVisibility}
            onClick={handleHeaderDataPopupVisibility}
            className='post__data__popup-background'
          />
          <div className='post__data-popup'>
            {tags && (
              <div className='post__data__tags'>
                <div>Tags:</div>
                <div className='data__tags__container'>
                  {tags.map(tag => (
                    <Button
                      onClick={() => searchPostsByTag(tag)}
                      variant='outlined'
                      key={tag}>
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
