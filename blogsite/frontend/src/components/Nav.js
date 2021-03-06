import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'

function Nav() {

  const auth = useSelector((state) => state.auth)
  const onprofile = useSelector((state) => state.onprofile)
  const dispatch = useDispatch()

  const { logoutUser, onPostPage, onProfilePage, addProfile, clearProfile, clearPost, clearPosts, followingLiked } = bindActionCreators(actionCreators, dispatch)

  const LoggingOut = () => {
    // logging out done by just removing user's tokens from local storage and user from state
    logoutUser()
    clearProfile()
    clearPost()
    clearPosts()
    onProfilePage(false)
    onPostPage(false)
    followingLiked(false)
  }

  // takes you to the user profile from the navbar
  const toProfile = async () => {
    if (onprofile) {
      onProfilePage(false)
      clearProfile()
    }

    // updated profile info
    const res = await fetch(`http://127.0.0.1:8000/api/user-detail/${auth.user.id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + auth.access_token
        }
      })
    const data = await res.json()
    addProfile(data)

    onProfilePage(true)
  }
  
  const clickLogo = () => {
    onProfilePage(false)
    clearProfile()
    onPostPage(false)
    clearPost()
    followingLiked(false)
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