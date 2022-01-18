import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'

function Nav() {

  const auth = useSelector((state) => state.auth)
  const onpage = useSelector((state) => state.onpage)
  const indpost = useSelector((state) => state.indpost)
  const onprofile = useSelector((state) => state.onprofile)
  const indprofile = useSelector((state) => state.indprofile)
  const dispatch = useDispatch()

  const { logoutUser, onPostPage, onProfilePage, addProfile, clearProfile, clearPost } = bindActionCreators(actionCreators, dispatch)

  const LoggingOut = () => {
    // logging out done by just removing user's tokens from local storage and user from state
    logoutUser()
    clearProfile()
    clearPost()
  }

  const toProfile = () => {
    onProfilePage(true)
    addProfile(auth.user)
  }
  
  const clickLogo = () => {
    onProfilePage(false)
    clearProfile()
    onPostPage(false)
    clearPost()
  }

  return (
    <nav className="navbar fixed-top">
      <div className="container">
        <Link to="/" className="nav-style" style={{marginLeft: 40}} onClick={clickLogo}>
          <h3>BlogSite</h3>
        </Link>
        <ul className="nav-links">
          { auth.isAuthenticated ? 
            <>
              <li className="nav-style" onClick={toProfile}>{auth.user.username}</li>
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