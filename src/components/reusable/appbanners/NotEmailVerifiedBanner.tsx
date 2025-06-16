import useTranslations from '../../../hooks/useTranslations'
import './NotEmailVerifiedBanner.css'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

export default function NotEmailVerifiedBanner() {
  const t = useTranslations().verifyEmailBanner

  const bannerStyles = {
    fontSize: 'var(--fs-small)',
    backgroundColor: 'var(--dark-blue)',
    color: 'var(--white)',
    fontWeight: 500,
    padding: '.6rem',
    boxShadow: '0 2px 5px var(--dark-blue)',
    maxWidth: '95%',
    borderRadius: '.3rem'
  }

  const linkStyles = {
    color: 'var(--light-grayish)',
    marginLeft: '.5rem'
  }

  return (
    <Box
      sx={bannerStyles}
      className='verify-email-banner dont-grow text-balance text-center'>
      <span className='verify-email-banner__text'>{t.text}</span>
      <Link
        to='/verify'
        className='verify-email-banner__link'
        style={linkStyles}>
        {t.button}
      </Link>
    </Box>
  )
}
