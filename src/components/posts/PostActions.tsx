import deleteIcon from '/images/icon-delete.svg'
import editIcon from '/images/icon-edit.svg'
import replyIcon from '/images/icon-reply.svg'
import IconButton from '../reusable/buttons/IconButton'
import type { PostActionProps } from '../../interfaces/posts.d.ts'
import { useContext } from 'react'
import { AppContext } from '../../App.tsx'

export default function PostActions({ isAuthor }: { isAuthor: boolean }) {
  function onReply() {}

  function onEdit() {}

  function onDelete() {}

  return (
    <div className='post__actions flex'>
      {isAuthor ? (
        <>
          <PostAction
            size={15}
            onClick={onDelete}
            text='Delete'
            icon={deleteIcon}
          />
          <PostAction size={15} onClick={onEdit} text='Edit' icon={editIcon} />
        </>
      ) : (
        <PostAction size={15} onClick={onReply} text='Reply' icon={replyIcon} />
      )}
    </div>
  )
}

function PostAction({ size = 20, icon, onClick, text }: PostActionProps) {
  const { screenType } = useContext(AppContext)

  return (
    <IconButton
      sx={{
        fontWeight: 'bold',
        fontSize: '.8rem',
        letterSpacing: '.5px'
      }}
      icon={icon}
      text={screenType !== 'mobile' ? text : ''}
      size={size}
      onClick={onClick}
      className={`post__action action__${text?.toLowerCase()}`}
    />
  )
}
