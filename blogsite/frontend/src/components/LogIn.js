import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Button from './Button'
import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'

const LogIn = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { loginUser, logoutUser } = bindActionCreators(actionCreators, dispatch)

  const LoggingIn = async () => {
    
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
    
    // add access and refresh tokens to browser's local storage
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('refresh_token', data.refresh_token)
    localStorage.setItem('isAuthenticated', true)
    localStorage.setItem('isLoading', false)
    localStorage.setItem('user', data.user)

    if (res.status === 200) {
      loginUser(data)
      setErrors('')
      setUsername('')
      setPassword('')
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
