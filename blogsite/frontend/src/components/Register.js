import Button from './Button'

const Register = () => {

  const Registering = () => {
    console.log('Registering for BlogSite...')
  }

  return (
    <div className="sidebar">
      <h3>Register for BlogSite</h3>
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
          <label for="confirmation">Password again:</label><br/>
          <input type="password" id="confirmation" name="confirmation" autoComplete="off" />
        </div>
        <div className="form-element">
          <Button text="Register" onClick={Registering} />
        </div>
      </form>
    </div>
  )
}

export default Register