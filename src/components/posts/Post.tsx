import { useAuth } from '../../firebase/context/AuthContext'
import PostVoteCounter from './PostVoteCounter'
import './Post.css'
import { Suspense, lazy, useContext, memo, useMemo, useEffect } from 'react'
import type { PostPropsWithId } from '../../interfaces/posts.d.ts'
import PostActions from './PostActions'
import PostText from './PostText'
import PostUser from './PostUser'
import type { FieldValue } from 'firebase/firestore'
import { AppContext } from '../../App.tsx'

// Only used on smaller screens
const PostData = lazy(() => import('./PostData'))

// Only used on larger screens
const PostTags = lazy(() => import('./PostTags'))

export default function Post({
  content,
  votes = { up: 0, down: 0 },
  tags = null,
  userAvatar,
  timestamp,
  authorName,
  authorId,
  isReply = false,
  postId
}: PostPropsWithId) {
  const { currentUser } = useAuth()

  const isAuthor = currentUser?.uid === authorId
  const { screenType } = useContext(AppContext)
  const isMobile = screenType === 'mobile'

  useEffect(() => {
    console.log(screenType === 'mobile', screenType)
  }, [screenType])

  const postHeaderProps = useMemo(
    () => ({
      postUserProps: { authorId, authorName, authorAvatar: userAvatar },
      timestamp,
      tags,
      isMobile
    }),
    [isMobile, tags, timestamp, authorId, authorName, userAvatar]
  )

  return (
    <div className={`post${isReply ? ' --reply' : ''}`}>
      <div className={`post__box flex${!isMobile ? ' --larger-screen' : ''}`}>
        {isMobile ? (
          <>
            <PostHeader {...postHeaderProps} />
            <PostText text={content} postId={postId} />

            <div className='post__footer flex'>
              <PostVoteCounter count={votes.up} />
              <PostActions isAuthor={isAuthor} />
            </div>
          </>
        ) : (
          <div className='post__content flex'>
            <PostVoteCounter count={votes.up} />

            <div className='post__content__data flex'>
              <div className='content__data__header flex'>
                <PostHeader {...postHeaderProps} />
                <PostActions isAuthor={isAuthor} />
              </div>
              <PostText text={content} postId={postId} />
            </div>
          </div>
        )}

        {!isMobile && tags && (
          <Suspense fallback={null}>
            <PostTags tags={tags} />
          </Suspense>
        )}
      </div>
    </div>
  )
}

interface PostHeaderProps {
  postUserProps: {
    authorId: string
    authorName: string
    authorAvatar: string
  }
  tags: string[] | null
  timestamp: FieldValue
  isMobile: boolean
}

const PostHeader = memo(function PostHeader({
  postUserProps,
  tags,
  timestamp,
  isMobile
}: PostHeaderProps) {
  return (
    <header className='post__header flex'>
      <div className='post__header__left-content flex'>
        <PostUser {...postUserProps} isMobile={isMobile} />
        <span className='post__header__timestamp text-center'>
          {timestamp.toLocaleString()}
        </span>
      </div>

      {isMobile && tags && (
        <Suspense fallback={null}>
          <PostData tags={tags} />
        </Suspense>
      )}
    </header>
  )
})
