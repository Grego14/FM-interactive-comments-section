import { toast as t, Slide, type ToastOptions } from 'react-toastify'

const toastProps: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined, // See what this does later...
  theme: 'light', // TODO - Change this depending of user preferences
  transition: Slide
}

interface CustomToastProps {
  content: string
  type?: 'error' | 'success'
}

export default function toast({ content, type = 'error' }: CustomToastProps) {
  console.error(content)
  return t[type](content, toastProps)
}
