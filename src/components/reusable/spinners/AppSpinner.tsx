import { useEffect, useState } from 'react'
import icsLogo from '/images/icsLogo.png'

export default function AppSpinner({
  onAnimationEnd
}: { onAnimationEnd: () => void }) {
  const [appLogo, setAppLogo] = useState<undefined | string>(undefined)

  useEffect(() => {
    const logo = new Image()
    logo.src = icsLogo
    logo.fetchPriority = 'high'

    logo.addEventListener('load', () => {
      setAppLogo(icsLogo)
    })
  }, [])

  return (
    <div className='app-spinner'>
      {appLogo && (
        <img
          src={appLogo}
          className='app-spinner__image slide-in-elliptic-top-fwd'
          alt=''
          aria-hidden='true'
          width='100'
          height='100'
          onAnimationEnd={onAnimationEnd}
        />
      )}
    </div>
  )
}
