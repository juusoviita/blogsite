import { useState } from 'react'
import Button from './Button'

const Register = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [errors, setErrors] = useState([])

  
  const RegisterUser = async () => {

    const url = 'http://127.0.0.1:8000/api/dj-rest-auth/registration/'

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        username: username,
        email: email,
        password1: password,
        password2: confirmation,
      })
    })

    // how to handle errors and display error info?
    const data = await res.json()
    if (res.status === 201) {
      console.log('User created!')
      console.log(data)
      setErrors([])
    } else {
      const errorMsg = []
      if (data.hasOwnProperty('non_field_errors')) {
        errorMsg.push(data.non_field_errors[0]) 
      }
      if (data.hasOwnProperty('username')) {
        errorMsg.push(data.username[0])
      }
      
      if (data.hasOwnProperty('email')) {
        errorMsg.push('Email field may not be blank')
      }
      
      setErrors(...errorMsg)
      
      /* Create an Alerts components and render it there
      if (errors.length != 0) {
        const alerts = errors.map((error) => {
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        })
      }
      */
    }
    // data to be added to global state to show that user is logged in
    // setErrors([])
    setUsername('')
    setEmail('')
    setPassword('')
    setConfirmation('')
  }

  return (
    <div className="sidebar">
      <h3>Register for BlogSite</h3>
      <form>
        <div className="form-element">
          <label for="username">Username:</label><br/>
          <input type="text" id="username" name="username" value={username} autoComplete="off" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-element">
          <label for="email">Email:</label><br/>
          <input type="email" id="email" name="email" value={email} autoComplete="off" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-element">
          <label for="password">Password:</label><br/>
          <input type="password" id="password" name="password" value={password} autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-element">
          <label for="confirmation">Password again:</label><br/>
          <input type="password" id="confirmation" name="confirmation" value={confirmation} autoComplete="off" onChange={(e) => setConfirmation(e.target.value)} />
        </div>
        <div className="form-element">
          <Button text="Register" onClick={RegisterUser} />
        </div>
      </form>
      <p>Already registered? Login here.</p>
    </div>
  )
}

export default Register