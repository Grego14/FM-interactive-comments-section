import { useState, useContext } from 'react'
import DropdownMenu from '../dropdownmenu/DropdownMenu.tsx'
import './Notifications.css'
import type { SxProps } from '@mui/material'
import NotificationIcon from '@mui/icons-material/Notifications'
import { AppContext } from '../../../App.tsx'

interface NotificationProps {
  title: string
  description: string
  id?: string
  read?: boolean
  createdAt: string
}

export default function Notifications() {
  const [isInitialClick, setIsInitialClick] = useState(true)
  const { superUser } = useContext(AppContext)
  const [notifications, setNotifications] = useState<
    NotificationProps[] | null
  >(superUser?.notifications || null)

  function handleMenuClick() {
    setIsInitialClick(false)

    setNotifications(oldNotifications => {
      // Prevent removing the isNew prop on the first click
      if (isInitialClick) {
        return oldNotifications
      }

      // We also need to update the notifications on the document /users/{userId}
      return oldNotifications
        ? oldNotifications.map(notification => ({
            ...notification,
            read: false
          }))
        : oldNotifications
    })
  }

  const notificationStyles: SxProps = {
    ':hover': {
      backgroundColor: 'transparent'
    }
  }

  return (
    <DropdownMenu
      label={open => `${open ? 'Close' : 'Open'} my notifications`}
      icon={<NotificationIcon />}
      menuItemStyles={notificationStyles}
      onClick={handleMenuClick}>
      {notifications?.map((n, i) => (
        <Notification {...n} key={n.id || i} />
      ))}
    </DropdownMenu>
  )
}

function Notification({ title, description, read }: NotificationProps) {
  return (
    <div className={`notification${read ? ' notification--new' : ''}`}>
      <div className='notification__container'>
        <div className='notification__title'>{title}</div>
        <div className='notification__content'>{description}</div>
      </div>
      <div className='notification__line' />
    </div>
  )
}
