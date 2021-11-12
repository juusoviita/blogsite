// import { FavoriteIcon, FavoriteBorderIcon, ChatBubbleOutlineIcon, EditIcon, DeleteIcon  } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import { Divider } from '@mui/material';

const Post = ({post, likePost, deletePost, editPost, replyPost }) => {
  
  return (
    <div key={post.id} className='post glass'>
      <div className="row post-header">
        <div className="col-2" style={{paddingTop: "5px"}}>
          <Avatar style={{marginLeft: "auto", marginRight: "auto"}}>id{post.poster}</Avatar>
        </div>
        <div className="col">
          {post.poster} <br/>
          {post.timestamp}
        </div>
      </div>
      <Divider />
      <div className="row">
          <div className="col post-content">
            {post.content}
          </div>
      </div>
      <Divider />
      <div className="row icon-div">
        <div className="col-2">
          <FavoriteIcon className='post-icons favorite' onClick={() => likePost(post.id)} />
          <FavoriteBorderIcon className='post-icons favorite' onClick={() => likePost(post.id)} />
          {post.likes.length}
        </div>
        <div className="col-2">
          <ChatBubbleOutlineIcon className='post-icons comment' onClick={() => replyPost(post.id)} />
          {post.replies.length}
        </div>
        <div className="col" style={{textAlign: "right"}}>
          <EditIcon className='post-icons edit' onClick={() => editPost(post.id)} />
          <DeleteIcon className='post-icons delete' onClick={() => deletePost(post.id)} />
        </div>
      </div>
    </div>
  )
}

export default Post
