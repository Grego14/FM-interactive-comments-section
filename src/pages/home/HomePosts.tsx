import { collection, getDocs, query, where } from 'firebase/firestore'
import { type ReactNode, useEffect, useState } from 'react'
import Post from '../../components/posts/Post'
import { useAuth } from '../../firebase/context/AuthContext'
import { db } from '../../firebase/firebase-config.ts'
import type { PostPropsWithId } from '../../interfaces/posts.d.ts'
import Spinner from '../../components/reusable/spinners/Spinner'

export default function HomePosts() {
  const { currentUser } = useAuth()
  const [posts, setPosts] = useState<ReactNode[] | null>(null)
  const [fetchingPosts, setFetchingPosts] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const postsQuery = query(
          collection(db, 'posts'),
          where('authorId', '!=', currentUser?.uid)
        )

        const querySnapshot = await getDocs(postsQuery)

        if (!querySnapshot) return

        const queryData = querySnapshot.docs.map(doc => {
          return {
            postId: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp.toDate()
          } as PostPropsWithId
        })

        setPosts(() => {
          return queryData.map(data => <Post {...data} key={data.postId} />)
        })

        setFetchingPosts(false)
      } catch (err) {
        console.error((err as Error).message)
      }
    })()
  }, [currentUser?.uid])

  return fetchingPosts ? (
    <Spinner />
  ) : (
    <section className='home__posts'>{posts}</section>
  )
}
