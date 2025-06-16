import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import useTranslations from '../../../hooks/useTranslations'

export default function SignUpButton({ variant = 'contained' }: { variant: 'text' | 'contained' | 'outlined' }) {
  const t = useTranslations()
  const navigate = useNavigate()

  return (
    <Button
      variant={variant}
      sx={{ fontWeight: 'bold' }}
      className='auth-button signup-button'
      onClick={() => navigate('/signup')}>
      {t.signUpButton}
    </Button>
  )
}
