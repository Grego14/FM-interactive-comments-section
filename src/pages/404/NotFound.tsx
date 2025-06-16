import { useNavigate } from 'react-router-dom'
import './notfound.css'
import IconButton from '../../components/reusable/buttons/IconButton'
import BackIcon from '@mui/icons-material/ArrowBack'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className='notfound'>
      <h1 className='notfound__title text-center text-balance'>
        <span className='notfound__number'>404</span> The page you are looking
        for doesn't exists!
      </h1>
      <IconButton
        iconPosition='left'
        icon={<BackIcon />}
        variant='contained'
        className='notfound__button'
        text='Go back to home'
        onClick={() => navigate('/')}
      />
    </div>
  )
}
