import useTranslations from '../../../hooks/useTranslations'
import Box from '@mui/material/Box'

export default function OffLineBanner() {
  const t = useTranslations().offlineBanner

  const bannerStyles = {
    fontSize: 'var(--fs-small)',
    fontWeight: 500,
    color: 'var(--moderate-blue)'
  }

  const bannerModeStyles = {
    borderBottom: '3px solid var(--moderate-blue)'
  }

  return (
    <Box sx={bannerStyles} className='dont-grow'>
      <span>{t.text}</span>
      <Box component='span' sx={bannerModeStyles}>
        {t.mode}
      </Box>
    </Box>
  )
}
