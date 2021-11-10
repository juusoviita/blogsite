import SidebarLink from './SidebarLink';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from './Button'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'

const SidebarLeft = ({ onAdd, showAdd }) => {

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
    <div className="sidebar glass">
      <SidebarLink Icon={PeopleOutlineIcon} text={auth.user.username} />
      <SidebarLink Icon={PeopleOutlineIcon} text="Following" />
      <SidebarLink Icon={FavoriteBorderIcon} text="Liked Posts" />
      <Button text="Post" onClick={onAdd} showAdd={showAdd} />
      <div onClick={LoggingOut}><SidebarLink Icon={LogoutIcon} text="Log Out" /></div>
    </div>
  )
}

export default SidebarLeft

