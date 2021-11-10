import Avatar from '@mui/material/Avatar';

function SidebarLink({ Icon, text, onClick }) {
  return(
    <div className="link">
        { (text === "Following" || text === "Liked Posts" || text === "Log Out" || text === "Settings") 
          ? <Icon className="link-icon" />
          : <Avatar sx={{ width: 26, height: 26 }} className="link-icon">un</Avatar>
        }
        <h2>{text}</h2>
    </div>
  );
}
export default SidebarLink;