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

  const { loginUser, logoutUser, addProfile } = bindActionCreators(actionCreators, dispatch)

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

    if (res.status === 200) {
      // updates the user's info to contain profile data as well
      const fetchUser = async (id) => {
        const res2 = await fetch(`http://localhost:8000/api/user-detail/${id}`, {
          method: 'GET',
          headers: {
            'Content-type':'application/json',
            'Authorization': 'Bearer ' + data.access_token
          }
        })
        const data2 = await res2.json()
        return data2
      }
      
      const userdata = await fetchUser(data.user.pk)
      console.log(userdata)
      Object.assign(data.user, userdata)
      console.log(data)
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
    <div className="userform">
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
          <input className="login" type="text" id="username" name="username" value={username} autoComplete="off" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-element">
          <label for="password">Password:</label><br/>
          <input className="login" type="password" id="password" name="password" value={password} autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
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
