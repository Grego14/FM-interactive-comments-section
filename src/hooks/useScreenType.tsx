import { useEffect, useState } from 'react'

export type ScreenType = 'mobile' | 'tablet' | 'desktop'

export default function useScreenType() {
  const [screenType, setScreenType] = useState<ScreenType>(() => {
    const width = window.innerWidth

    if (width >= 1024) return 'desktop'
    if (width < 1024 && width > 481) return 'tablet'

    return 'mobile'
  })

  useEffect(() => {
    const desktopQuery = matchMedia('(min-width: 1024px)')
    const tabletQuery = matchMedia('(min-width: 481px) and (max-width: 1023px)')

    const updateScreenType = () => {
      if (desktopQuery.matches) {
        setScreenType('desktop')
      } else if (tabletQuery.matches) {
        setScreenType('tablet')
      } else {
        setScreenType('mobile')
      }
    }

    desktopQuery.addEventListener('change', updateScreenType)
    tabletQuery.addEventListener('change', updateScreenType)

    updateScreenType()

    return () => {
      desktopQuery.removeEventListener('change', updateScreenType)
      tabletQuery.removeEventListener('change', updateScreenType)
    }
  }, [])

  return screenType
}
