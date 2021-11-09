import React from 'react'
import Nav from './components/Nav'
import LogIn from './components/LogIn'
import Register from './components/Register'
import Home from './components/Home'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from './state/index'

 
function App() {

  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  const { loginUser, logoutUser } = bindActionCreators(actionCreators, dispatch)

  return (
      <Router>
      <div className="container-fluid">
        <Nav />
        <Route path="/" exact component={Home} />
        <Route path="/login" component={LogIn} />
        <Route path="/register" component={Register} />
      </div>
    </Router>
  );
}

export default App;
