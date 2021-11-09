import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

const LogIn = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const LoggingIn = async () => {
    console.log('Logging in...')
    const url = 'http://127.0.0.1:8000/api/dj-rest-auth/login/'

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        username: username,
        password: password,
      })
    })

    const data = await res.json()
    if (res.status === 200) {
      console.log(data)
      setErrors('')
    } else {
      setErrors({'id': '1', 'msg': data.non_field_errors[0]})
    }
  }

  const clearErrors = () => {
    setErrors('')
  }

  return (
    <div className="sidebar">
      <h3 style={{color: 'whitesmoke'}}>Log In</h3>
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
          <label for="password">Password:</label><br/>
          <input type="password" id="password" name="password" value={password} autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-element">
          <Button text="Log In" onClick={LoggingIn} />
        </div>
      </form>
      <p style={{color: 'whitesmoke'}}>Don't have an account yet? <Link to="/register">Register here.</Link></p>
    </div>
  )
}

export default LogIn
