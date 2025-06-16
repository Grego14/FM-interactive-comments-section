import { useApp } from '../../App'
import icsLogoLight from '/images/icslogo-light.svg'
import icsLogoDark from '/images/icslogo-dark.svg'

export default function AppLogo({ size = 100, theme }: { theme?: string, size?: number }) {
  const { theme: appTheme } = useApp()

  return (
    <img
      src={(theme || appTheme) === 'light' ? icsLogoLight : icsLogoDark}
      alt=''
      aria-hidden='true'
      width={size}
      height={size}
    />
  )
}
