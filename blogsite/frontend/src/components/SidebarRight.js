import TextField from '@mui/material/TextField';
import SidebarLink from './SidebarLink';
import SettingsIcon from '@mui/icons-material/Settings';

const SidebarRight = () => {
  return (
    <div className="sidebar right glass">
      <TextField id="search" label="Search" variant="outlined" type="search" fullWidth />
      <SidebarLink Icon={SettingsIcon} text="Settings" />
    </div>
  )
}

export default SidebarRight
