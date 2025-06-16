import { logOut } from '../../../firebase/auth.js'
import Button from '@mui/material/Button'

export default function LogoutButton({
  variant = 'outlined'
}: {
  variant?: 'text' | 'contained' | 'outlined'
}) {
  return (
    <Button variant={variant} onClick={() => logOut()}>
      Log Out
    </Button>
  )
}
