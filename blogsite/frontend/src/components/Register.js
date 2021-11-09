import { useState } from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

const Register = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [errors, setErrors] = useState([])

  
  const RegisterUser = async () => {
    
    setErrors([])
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
      setErrors([])
    } else {
      if (data.hasOwnProperty('non_field_errors')) {
        setErrors({'id': '1', 'msg': data.non_field_errors[0]}) 
      }
      if (data.hasOwnProperty('username')) {
        setErrors({'id': '2', 'msg': data.username[0]})
      }
      if (data.hasOwnProperty('email')) {
        setErrors({'id': '3', 'msg': 'Email address field cannot be empty'})
      }   
    }
    // data to be added to global state to show that user is logged in
    setUsername('')
    setEmail('')
    setPassword('')
    setConfirmation('')
  }

  const clearErrors = () => {
    setErrors('')
  }

  return (
    <div className="sidebar">
      <h3 style={{color: 'whitesmoke'}}>Register for BlogSite</h3>
      { errors.length !== 0 && 
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <p>{errors.msg}</p>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={clearErrors}></button>
        </div>
      }
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
      <p style={{color: 'whitesmoke'}}>Already registered? <Link to="/login">Login here.</Link></p>
    </div>
  )
}

export default Register