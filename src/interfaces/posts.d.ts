import type { FieldValue } from 'firebase/firestore'
import type { KeyboardEvent, MouseEvent } from 'react'

interface PostPropsWithId extends Post {
  postId: string
}

interface Post {
  slug: string
  userAvatar: string
  content: string
  votes?: {
    up: number
    down: number
  }
  tags: string[] | null
  timestamp: FieldValue
  authorName: string
  authorId: string
  isReply?: boolean
  replys?: PostPropsWithId[] | null
  archived: boolean
}

export interface PostProps extends Post {
  onUpvote?: () => void
  onDownvote?: () => void
  onReply?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export interface PostUserProps {
  authorName: string
  authorAvatar: string
  authorId: string
  isMobile: boolean
}

export interface PostActionProps {
  icon: string
  onClick: () => void
  text?: string
  size?: number
}

export interface PostHeaderDataProps {
  timestamp: FieldValue
  tags: string[] | null
}

export interface PostHeaderProps extends PostHeaderDataProps {
  userAvatar: string
  authorName: string
  authorId: string
  isMobile: boolean
  invalidAvatarImage: string
}

export type UserInteraction<T extends HTMLElement> =
  | MouseEvent<T>
  | KeyboardEvent<T>
