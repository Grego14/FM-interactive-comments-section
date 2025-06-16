import { useContext, Children, memo } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../../../App.tsx'
import { useAuth } from '../../../firebase/context/AuthContext.tsx'
import AppLogo from '../AppLogo'
import LoginButton from '../auth/LoginButton'
import SignUpButton from '../auth/SignUpButton'
import DropdownMenu from '../dropdownmenu/DropdownMenu'
import Notifications from '../buttons/Notifications'
import { Box } from '@mui/material'

export default memo(function Nav() {
  const { currentUser } = useAuth()
  const isMobile = useContext(AppContext).screenType === 'mobile'

  return (
    <nav className='nav'>
      <ul className='nav__list'>
        <li className='nav__item'>
          <NavLink to='/' className='nav__logo'>
            <AppLogo />
          </NavLink>
        </li>

        {currentUser && (
          <li className='nav__item'>
            <ul className='inner-nav'>
              <li className='inner-nav__item'>
                <Notifications />
              </li>

              {!currentUser &&
                (isMobile ? (
                  <DropdownMenu
                    className='inner-nav__item'
                    label={(open: boolean) =>
                      `Touch to ${open ? 'close' : 'open'} the menu`
                    }>
                    <AuthButtons />
                  </DropdownMenu>
                ) : (
                  Children.map(Children.toArray(<AuthButtons />), child => (
                    <li className='inner-nav__item'>{child}</li>
                  ))
                ))}
            </ul>
          </li>
        )}
      </ul>
      <div className='nav__line' />
    </nav>
  )
})

function AuthButtons() {
  return (
    <Box sx={{ display: 'flex', gap: '1rem' }}>
      <LoginButton />
      <SignUpButton />
    </Box>
  )
}
