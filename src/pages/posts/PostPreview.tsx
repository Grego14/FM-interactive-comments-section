import { useLocation } from 'react-router-dom'
import Post from '../../components/posts/Post'
import { useState, useEffect } from 'react'
import { db } from '../../firebase/firebase-config.ts'
import { collection, query, getDocs } from 'firebase/firestore'
import { useAuth } from '../../firebase/context/AuthContext.js'
import type { PostProps } from '../../interfaces/posts.d.ts'
import './PostPreview.css'

export default function PostPreview() {
  const { loading } = useAuth()
  const actualLocation = useLocation()
  const postId = actualLocation.pathname.match(/[^\/posts\/].*/)?.[0]

  const [postData, setPostData] = useState<PostProps | null>(null)

  if (!postId) {
    return <div>Invalid Post ID</div>
  }

  useEffect(() => {
    ; (async function getPosts() {
      // TODO - See if i can get the /post/{postId} instead of the entire /posts
      const postQuery = query(collection(db, '/posts'))

      //console.log('this is the postQuery bro ->', postQuery)
      const querySnapshot = await getDocs(postQuery)
      //console.log('this is the querySnapshot bro ->', querySnapshot)

      const queryData = querySnapshot.docs
        .filter(doc => doc.id === postId)
        .map(post => ({
          postId: post.id,
          ...(post.data() as PostProps),
          timestamp: post.data().timestamp.toDate()
        }))[0]

      console.log(queryData)
      setPostData(queryData)
    })()
  }, [postId])

  return postData && !loading ? (
    <div className='post-preview'>
      <Post {...postData} />
    </div>
  ) : (
    <div>Loading post...</div>
  )
}
