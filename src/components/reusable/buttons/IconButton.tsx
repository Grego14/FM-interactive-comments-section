import { type ReactNode, useMemo, type HTMLAttributes } from 'react'
import Button from '@mui/material/Button'
import type { SxProps } from '@mui/material'

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: string | ReactNode
  size?: number
  text?: string
  sx?: SxProps
  variant?: 'contained' | 'outlined' | 'text'
  iconPosition?: 'right' | 'left'
}

export default function IconButton(props: IconButtonProps) {
  const { icon, size, text, sx, variant, iconPosition = 'right', className, ...otherProps } = props

  const iconElement = useMemo(
    () =>
      typeof icon === 'string' ? (
        <img src={icon} alt='' aria-hidden width={size} height={size} />
      ) : (
        icon
      ),
    [icon, size]
  )

  return (
    <Button
      variant={variant}
      className={`${className} icon-button`}
      sx={sx}
      {...otherProps}
      startIcon={text && iconPosition === 'left' ? iconElement : undefined}
      endIcon={text && iconPosition === 'right' ? iconElement : undefined}>
      {text && <span className='icon-button__text'>{text}</span>}

      {/* If there is no text theres no need to use the start/end-Icon prop (this props add a margin) */}
      {!text && iconElement}
    </Button>
  )
}
