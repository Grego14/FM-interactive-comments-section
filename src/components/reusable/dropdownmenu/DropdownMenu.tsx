import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { type ReactNode, Children, useState, useEffect } from 'react'
import './DropdownMenu.css'
import MenuClosedIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import type { SxProps } from '@mui/material'

interface DropdownMenuProps {
  children: ReactNode[] | ReactNode
  icon?: string | ReactNode
  menuItemStyles?: SxProps
  onClick?: () => void
  onClose?: () => void
  label: (open: boolean) => string
  className?: string
}

export default function DropdownMenu({
  children,
  icon,
  menuItemStyles,
  onClick,
  onClose,
  label,
  className
}: DropdownMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)

  useEffect(() => {
    if (!open && onClose) onClose()
  }, [open, onClose])

  const menuItems = Children.map(children, child => (
    <MenuItem sx={menuItemStyles}>{child}</MenuItem>
  ))

  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(e.currentTarget)

    if (onClick) onClick()
  }

  return (
    menuItems?.length && (
      <>
        <Button onClick={handleButtonClick} aria-label={label?.(open)}>
          {icon ? icon : !open ? <MenuClosedIcon /> : <MenuOpenIcon />}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          className={className}>
          {menuItems}
        </Menu>
      </>
    )
  )
}
