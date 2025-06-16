import { Component, type ErrorInfo, type ReactNode } from 'react'
import Button from '@mui/material/Button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary:', error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className='error-boundary'>
            <h2 className='error-boundary__title text-center'>
              ¡Oops! something went wrong.
            </h2>
            <p className='error-boundary__error-message'>
              {this.state.error?.message}
            </p>
            <Button onClick={this.resetError}>Retry</Button>
          </div>
        )
      )
    }

    return this.props.children
  }
}
