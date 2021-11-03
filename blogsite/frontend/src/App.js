import React from 'react'
import Nav from './components/Nav'
import LogIn from './components/LogIn'
import Register from './components/Register'
import Home from './components/Home'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
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
