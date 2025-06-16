import hideCharsAt from '../../utils/hideCharsAt.js'
import { Link } from 'react-router-dom'

export default function PostText({
  text,
  postId
}: { text: string; postId: string }) {
  // TODO - Look for a library and allow users to write markdown text

  return (
    <Link
      className='post__text'
      to={`/posts/${postId}`}>{`${hideCharsAt(text, 197)}...`}</Link>
  )
}
