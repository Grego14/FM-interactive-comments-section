import LoginButton from '../../components/reusable/auth/LoginButton'

export default function HomeNoLoggedContent() {
  return (
    <div className='home__no-logged text-center'>
      <p>Where your posts live!</p>
      <div>
        <span className='no-logged__login-text'>
          Login to start creating posts
        </span>
        <LoginButton variant='contained' />
      </div>
      {/* TODO - INSERT EXAMPLE OF POSTS*/}
    </div>
  )
}
