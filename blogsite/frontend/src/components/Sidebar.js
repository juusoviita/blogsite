import SidebarLink from './SidebarLink';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from './Button'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'

const Sidebar = ({ onAdd, showAdd }) => {

  const auth = useSelector((state) => state.auth)
  const onprofile = useSelector((state) => state.onprofile)
  const dispatch = useDispatch()

  const { loginUser, logoutUser, onProfilePage, addProfile, clearProfile } = bindActionCreators(actionCreators, dispatch)


  const toProfile = async () => {
    if (onprofile) {
      onProfilePage(false)
      clearProfile()
    }

    console.log('something is happening')

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

  const LoggingOut = () => {
    // logging out done by just removing user's tokens from local storage and user from state
    logoutUser()
  }

  return (
    <div className="sidebar glass">
      <SidebarLink onClick={toProfile} Icon={PeopleOutlineIcon} text={auth.user.username} />
      <SidebarLink Icon={PeopleOutlineIcon} text="Following" />
      <SidebarLink Icon={FavoriteBorderIcon} text="Liked Posts" />
      <Button text="Post" onClick={onAdd} showAdd={showAdd} />
      <div onClick={LoggingOut}><SidebarLink Icon={LogoutIcon} text="Log Out" /></div>
    </div>
  )
}

export default Sidebar

