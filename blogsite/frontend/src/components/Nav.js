import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'

function Nav() {

  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { loginUser, logoutUser } = bindActionCreators(actionCreators, dispatch)

  const LoggingOut = () => {
    // logging out done by just removing user's tokens from local storage and user from state
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    logoutUser()
  }
    

  return (
    <nav className="navbar">
      <div className="container">
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