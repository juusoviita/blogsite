import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'

function Nav() {

  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { loginUser, logoutUser } = bindActionCreators(actionCreators, dispatch)

  const LoggingOut = async () => {
    const url = 'http://127.0.0.1:8000/api/dj-rest-auth/logout/'
  
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        access_token: auth.access_token,
        refresh_token: auth.refresh_token,
        isAuthenticated: auth.isAuthenticated,
        isLoading: auth.isLoading,
        user: auth.user,
      })
    })

    const data = await res.json()
    logoutUser(data)

  }
    

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-style">
          <p>Logo</p>
        </Link>
        <Link to="/" className="nav-style" style={{marginLeft: 40}}>
          <h3>BlogSite</h3>
        </Link>

        <ul className="nav-links">
          { auth.isAuthenticated ? 
            <>
              <li className="nav-style">{auth.user.username}</li>
              <li className="nav-style" onClick={LoggingOut}>Log out</li>
            </>
            :
            <>
              <Link to="/login" className="nav-style">
                <li>Log in</li>
              </Link>
              <Link to="/register" className="nav-style">
                <li>Register</li>
              </Link> 
            </>
        }
        </ul>
      </div>
    </nav>
  );
}

export default Nav;