import IconButton from '../reusable/buttons/IconButton'

import minusIcon from '/images/icon-minus.svg'
import plusIcon from '/images/icon-plus.svg'

export default function PostVoteCounter({ count }: { count: number }) {
  // TODO - Implement this functions
  function onUpvote() {}
  function onDownvote() {}

  return (
    <div className='post__vote-counter flex'>
      <IconButton
        icon={plusIcon}
        size={12}
        onClick={onUpvote}
        className='vote-counter__button vote-counter__button--up'
        aria-label='Vote up'
      />
      <div
        className='vote-counter__count'
        aria-label={`Actual vote count is ${count}`}>
        {count}
      </div>
      <IconButton
        icon={minusIcon}
        size={12}
        onClick={onDownvote}
        className='vote-counter__button vote-counter__button--down'
        aria-label='Vote down'
      />
    </div>
  )
}
