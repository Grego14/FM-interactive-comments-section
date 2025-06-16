import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import {
  type ChangeEvent,
  type KeyboardEvent,
  useRef,
  useState,
  useCallback
} from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase/firebase-config.ts'
import './NewPost.css'
import IconButton from '../../components/reusable/buttons/IconButton'
import { useAuth } from '../../firebase/context/AuthContext.tsx'
import type { PostProps } from '../../interfaces/posts.d.ts'
import PostIcon from '@mui/icons-material/Send'
import CrossIcon from '@mui/icons-material/Delete'

// TODO - Search open & closed eye icon
import PreviewIcon from '@mui/icons-material/PanoramaFishEye'

export default function NewPostForm() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')
  const postContentRef = useRef(null)
  const [showPostPreview, setShowPostPreview] = useState(false)
  const [error, setError] = useState('')

  const [inputTagsValue, setInputTagsValue] = useState('')
  const [postTags, setPostTags] = useState<string[] | null>(null)

  const handlePostContent = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      console.log('updating the postContent')
      setPostContent(e.target.value)
    },
    []
  )

  const isEmailVerified = currentUser?.emailVerified

  function createSlug(title: string) {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\p{M}]/gu, '')
      .replace(/[^\p{L}\d\s-]/gu, '')
      .trim()
      .replace(/\s+/g, '-')
  }

  async function createNewPost() {
    if (!isEmailVerified) throw Error('Email must be verified!')

    if (!postContent) {
      // TODO - Show error notificacion if the post content is empty
      throw Error("Post content can't be empty")
    }

    try {
      if (currentUser) {
        const docRef = await addDoc(collection(db, 'posts'), {
          content: postContent,
          authorEmail: currentUser.email,
          timestamp: serverTimestamp(),
          votes: { up: 0, down: 0 },
          authorName: currentUser.displayName,
          authorId: currentUser.uid,
          userAvatar: currentUser.photoURL,
          tags: postTags,
          slug: createSlug(postTitle),
          archived: false
        } as PostProps)

        // Success notification: Post created successfully. Redirecting...
        console.log('Post created successfully. Redirecting...', docRef)
        navigate(`/posts/${docRef.id}`)
      }
    } catch (error) {
      // Error notification: Can't create post. error.message
      throw Error(`Error while creating the post -> ${error}`)
    }
  }

  function handlePostTitle(e: ChangeEvent<HTMLInputElement>) {
    const postTitleRegex = /^[\p{L}\d\s\-_,;:!?().$%#'"{}\[\]\\*~=@&^´]*$/u
    const value = e.target.value

    if (!postTitleRegex.test(value)) {
      return
    }

    setPostTitle(value)
  }

  function handlePostTags(e: ChangeEvent<HTMLInputElement>) {
    setError('')

    const postTagsRegex = /^[a-zA-Z\d\s_]*$/u
    const tags = e.target.value

    if (!postTagsRegex.test(tags))
      setError('You tag can only contain numbers, underscores and characters')

    setInputTagsValue(e.target.value)
  }

  // Separate tag and reset input value
  function separateTagOnUserSpace(e: KeyboardEvent<HTMLInputElement>) {
    if (!error && e.key === ' ') {
      setPostTags(state => {
        const noRepeatedPostTags = new Set([
          ...(state || []),
          (e.target as HTMLInputElement).value.trim()
        ])

        return Array.from(noRepeatedPostTags)
      })

      setInputTagsValue('')
    }
  }

  function removePostTag(tag: string) {
    setPostTags(state => {
      const newState = state?.filter(tags => tags !== tag) || state
      return newState
    })
  }

  return (
    <form className='form-post' onSubmit={e => e.preventDefault()}>
      <h1 className='form-post__title'>
        {showPostPreview ? 'Post Preview' : 'New Post'}
      </h1>

      {showPostPreview ? (
        <div className='form__post-preview'>
          <pre className='post-preview'>{postContent}</pre>
        </div>
      ) : (
        <div className='form-post__inputs'>
          <div className='form-post__group'>
            <label className='form-post__label' htmlFor='post-title'>
              Post Title
              <input
                value={postTitle}
                className='form-post__input form-post__input--title'
                type='text'
                placeholder='My post title...'
                onChange={handlePostTitle}
                id='post-title'
                name='post-title'
                disabled={!isEmailVerified}
              />
            </label>
          </div>
          <label className='form-post__label' htmlFor='post-content'>
            Post Content
            <textarea
              className='form-post__input form-post__input--content'
              name='post-content'
              id='post-content'
              cols={10}
              rows={10}
              value={postContent}
              placeholder='My post content...'
              onChange={handlePostContent}
              disabled={!isEmailVerified}
              ref={postContentRef}
            />
          </label>
          <div className='form-post__tags'>
            <label className='form-post__label' htmlFor='post-tags'>
              Post Tags
              <input
                className='form-post__input form-post__input--tags'
                type='text'
                value={inputTagsValue}
                onKeyDown={separateTagOnUserSpace}
                onChange={handlePostTags}
                id='post-tags'
                name='post-tags'
                disabled={!isEmailVerified || postTags?.length === 3}
              />
            </label>
            <span className='post__tags__max'>You can add up to 3 tags!</span>
            {postTags && (
              <div className='post__tags__preview'>
                {postTags.map(tag => (
                  <IconButton
                    onClick={() => removePostTag(tag)}
                    variant='outlined'
                    icon={<CrossIcon />}
                    key={tag}
                    text={tag}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <span className='form-post__error' aria-live='polite'>
          {error}
        </span>
      )}

      <div className='form-post__buttons'>
        <IconButton
          variant='outlined'
          icon={<PreviewIcon />}
          text={showPostPreview ? 'Edit' : 'Preview'}
          className='form-post__button form-post__button__preview'
          onClick={() => setShowPostPreview(state => !state)}
          disabled={!postContent}
        />

        <IconButton
          variant='outlined'
          icon={<PostIcon />}
          text='Post'
          className='form-post__button form-post__button__post'
          onClick={createNewPost}
          disabled={!isEmailVerified || !postContent}
        />
      </div>
    </form>
  )
}
