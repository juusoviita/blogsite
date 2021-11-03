import SidebarLink from './SidebarLink';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from './Button'

const SidebarLeft = ({ onAdd, showAdd }) => {

  return (
    <div className="sidebar glass">
      <SidebarLink Icon={PeopleOutlineIcon} text="username" />
      <SidebarLink Icon={PeopleOutlineIcon} text="Following" />
      <SidebarLink Icon={FavoriteBorderIcon} text="Liked Posts" />
      <Button text="Post" onClick={onAdd} showAdd={showAdd} />
      <SidebarLink Icon={LogoutIcon} text="Log Out" />
    </div>
  )
}

export default SidebarLeft

