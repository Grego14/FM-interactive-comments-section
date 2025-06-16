import { useContext } from 'react'
import { AppContext } from '../App'
import translations from '../translations.ts'

export default function useTranslations() {
  const { lang } = useContext(AppContext)

  return translations[lang || 'en']
}
