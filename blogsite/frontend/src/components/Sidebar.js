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

  const { logoutUser, onProfilePage, addProfile, clearProfile } = bindActionCreators(actionCreators, dispatch)


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

  const Following = async () => {
    console.log('Following!')

    // updated profile info
    const res = await fetch('http://127.0.0.1:8000/api/followed-posts/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + auth.access_token
      }
    })
    const data = await res.json()
    console.log(data)

  }

  const Liked = async () => {
    console.log('Liked!')

    const res = await fetch('http://127.0.0.1:8000/api/liked-posts/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + auth.access_token
      }
    })
    const data = await res.json()
    console.log(data)
  }

  const LoggingOut = () => {
    logoutUser()
  }

  return (
    <div className="sidebar glass">
      <SidebarLink Icon={PeopleOutlineIcon} text={auth.user.username} onClick={toProfile} />
      <SidebarLink Icon={PeopleOutlineIcon} text="Following" onClick={Following} />
      <SidebarLink Icon={FavoriteBorderIcon} text="Liked Posts" onClick={Liked} />
      <Button text="Post" onClick={onAdd} showAdd={showAdd} />
      <div onClick={LoggingOut}><SidebarLink Icon={LogoutIcon} text="Log Out" /></div>
    </div>
  )
}

export default Sidebar

