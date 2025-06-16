import { useState, useEffect, type HTMLAttributes } from 'react'
const invalidAvatarImage = '/images/icon-avatar.svg'

interface UserAvatarProps extends HTMLAttributes<HTMLImageElement> {
  userAvatar: string
  size: string
}

export default function UserAvatar(props: UserAvatarProps) {
  const [avatar, setAvatar] = useState(invalidAvatarImage)
  const { userAvatar, size, src: _, ...propsWithoutSrc } = props

  useEffect(() => {
    const tempAvatar = new Image()
    tempAvatar.src = userAvatar

    tempAvatar.onload = () => {
      setAvatar(userAvatar)
    }
  }, [userAvatar])

  return (
    <img src={avatar} {...propsWithoutSrc} alt='' width={size} height={size} />
  )
}
