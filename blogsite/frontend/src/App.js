import React from 'react'
import Nav from './components/Nav'
import LogIn from './components/LogIn'
import Register from './components/Register'
import Home from './components/Home'
import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from './state/index'

 
function App() {

  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { logoutUser, updateTokens } = bindActionCreators(actionCreators, dispatch)

  // Update user's access token
  const updateToken = async () => {
    let res = await fetch('http://127.0.0.1:8000/api/dj-rest-auth/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({'refresh': auth.refresh_token})
    })

    let data = await res.json()
    
    if (res.status === 200) {
      updateTokens(data)
    } else {
      console.log('Failed to update tokens')
      logoutUser()
    }
  }

  // Run updateToken every 4 minutes, if user is authenticated
  useEffect(() => {
    if (auth.isAuthenticated) {
      const fourMinutes = 4 * 60 * 1000
      let interval = setInterval(() => {
        if(auth.refresh_token) {
          updateToken()
        }
      }, fourMinutes)
    return () => clearInterval(interval)
    } else {
      logoutUser()
    }
  }, [auth.refresh_token, updateToken, logoutUser])

  return (
    <Router>
      <div className="container-fluid">
        { auth.isLoading ?
        null :
        <>
          <Nav />
          <Route path="/" exact component={Home} />
          <Route path="/login" component={LogIn} />
          <Route path="/register" component={Register} />
        </>
        }
      </div>
    </Router>
  );
}

export default App;
