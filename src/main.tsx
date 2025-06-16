import { scan } from 'react-scan'

scan({
  enabled: true,
})

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import './index.css'
import { AuthProvider } from './firebase/context/AuthContext.js'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import AppErrorBoundary from './AppErrorBoundary'
import CssBaseline from '@mui/material/CssBaseline'
import { GlobalStyles } from '@mui/material'

const root = createRoot(document.getElementById('root') as Element)

document.documentElement.setAttribute('lang', localStorage.getItem('lang') || 'en')

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 'var(--fs-small)',
          textTransform: 'none',
          minWidth: 'auto',
          transitionTimingFunction: 'var(--quadratic-c-bezier)',
          transitionProperty:
            'background-color, border-color, box-shadow, color',
          color: 'var(--moderate-blue)'
        },
        contained: {
          color: 'white'
        }
      }
    }
  }
})

function AppGlobalStyles() {
  return (
    <GlobalStyles
      styles={{
        body: {
          backgroundColor: 'var(--very-light-gray)',
          color: 'var(--dark-blue)',
          fontFamily: 'Rubik, system-ui, Avenir, Helvetica, Arial, sans-serif'
        }
      }}
    />
  )
}

root.render(
  <StrictMode>
    <CssBaseline />
    <AppGlobalStyles />

    <ThemeProvider theme={theme} noSsr>
      <AuthProvider>
        <AppErrorBoundary>
          <Router>
            <App />
          </Router>
        </AppErrorBoundary>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
)
