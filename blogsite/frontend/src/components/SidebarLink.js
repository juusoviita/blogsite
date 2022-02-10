import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux'

function SidebarLink({ Icon, text, onClick }) {
  
  const auth = useSelector((state) => state.auth)

  return(
    <div className="link" onClick={onClick}>
        { (text === "Following" || text === "Liked Posts" || text === "Log Out" || text === "Settings") 
          ? <Icon className="link-icon" />
          : <Avatar sx={{ width: 26, height: 26 }} className="link-icon" alt={auth.user.username}></Avatar>
        }
        <h2>{text}</h2>
    </div>
  );
}
export default SidebarLink;