import Button from './Button'

const LogIn = () => {

  const LoggingIn = () => {
    console.log('Logging in...')
  }

  return (
    <div className="sidebar">
      <h3>Log In</h3>
      <form>
        <div className="form-element">
          <label for="username">Username:</label><br/>
          <input type="text" id="username" name="username" autoComplete="off" />
        </div>
        <div className="form-element">
          <label for="password">Password:</label><br/>
          <input type="password" id="password" name="password" autoComplete="off" />
        </div>
        <div className="form-element">
          <Button text="Log In" onClick={LoggingIn} />
        </div>
      </form>
      <p>Don't have an account yet? Register here.</p>
    </div>
  )
}

export default LogIn
