import { db } from '../../firebase/firebase-config.ts'
import { collection, query, where, getDocs } from 'firebase/firestore'
import Post from '../../components/posts/Post'
import { useState, useEffect, type MouseEvent } from 'react'
import { useAuth } from '../../firebase/context/AuthContext.js'
import type { PostPropsWithId } from '../../interfaces/posts.d.ts'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import IconButton from '../../components/reusable/buttons/IconButton.tsx'

// temporal icons
import LatestIcon from '@mui/icons-material/LockClock'
import OlderIcon from '@mui/icons-material/PunchClock'
import UpVoteIcon from '@mui/icons-material/ArrowUpward'
import DownVoteIcon from '@mui/icons-material/ArrowDownward'
import useTranslations from '../../hooks/useTranslations.tsx'

export default function ProfilePosts() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState<PostPropsWithId[] | null>(null)
  const [sortType, setSortType] = useState('latest')
  const t = useTranslations().profile.posts

  useEffect(() => {
    ;(async function getPosts() {
      const postsQuery = query(
        collection(db, 'posts'),
        where('authorId', '==', currentUser?.uid)
      )

      const querySnapshot = await getDocs(postsQuery)

      const queryData = querySnapshot.docs.map(doc => {
        return {
          postId: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp.toDate()
        } as PostPropsWithId
      })

      setPosts(queryData)
    })()
  }, [currentUser])

  function handleSortPosts(e: MouseEvent<HTMLButtonElement>) {
    const value = e.currentTarget.dataset.value || 'latest'
    const sortType = ''

    setPosts(state => {
      // TODO - Make the sorting algorithm

      setSortType(sortType)
      return state?.sort(() => (value === 'latest' ? 0 : 1)) || state
    })
  }

  return (
    <div className='profile-posts'>
      {posts?.length ? (
        <>
          <div className='profile-posts__sort-options'>
            <span className='sort-options__sorting-text'>
              {t.sort.by}{' '}
              <span className='sorting-text__value'>{t.sort[sortType]}</span>
            </span>
            <IconButton
              icon={<LatestIcon />}
              text={t.sort.latest}
              value='latest'
              onClick={handleSortPosts}
            />
            <IconButton
              icon={<OlderIcon />}
              text={t.sort.older}
              value='older'
              onClick={handleSortPosts}
            />
            <IconButton
              icon={<UpVoteIcon />}
              text={t.sort.upvotes}
              value='upvotes'
              onClick={handleSortPosts}
            />
            <IconButton
              icon={<DownVoteIcon />}
              text={t.sort.downvotes}
              value='downvotes'
              onClick={handleSortPosts}
            />
          </div>

          {posts.map(post => (
            <Post {...post} key={post.postId} />
          ))}
        </>
      ) : (
        <>
          <div className='profile-posts__empty'>{t.postsEmpty}</div>
          <Button onClick={() => navigate('/new')} variant='contained'>
            {t.createPost}
          </Button>
        </>
      )}
    </div>
  )
}
