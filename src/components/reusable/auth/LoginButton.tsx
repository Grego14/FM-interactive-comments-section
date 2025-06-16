import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

export default function LoginButton({
  variant = 'text'
}: { variant?: 'text' | 'contained' | 'outlined' }) {
  const navigate = useNavigate()

  return (
    <Button
      variant={variant}
      className='auth-button login-button'
      onClick={() => navigate('/login')}>
      Log in
    </Button>
  )
}
