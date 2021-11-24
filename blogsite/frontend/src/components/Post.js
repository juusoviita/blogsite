// import { FavoriteIcon, FavoriteBorderIcon, ChatBubbleOutlineIcon, EditIcon, DeleteIcon  } from '@mui/icons-material';
import { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import { Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import ReplyForm from './ReplyForm';

const Post = ({post, likePost, deletePost, editPost }) => {
  
  // to handle the opening and closing of the Reply modal
  const [openReply, setOpenReply] = useState(false)
  const handleOpen = () => setOpenReply(true)
  const handleClose = () => setOpenReply(false)

  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { loginUser, logoutUser, updateTokens } = bindActionCreators(actionCreators, dispatch)

  // format the timestamp for the post
  const tstamp = new Date(post.timestamp)
  
  let minutes = ''
  if (tstamp.getMinutes() < 10) {
    minutes = `0${tstamp.getMinutes()}`
  } else {
    minutes = tstamp.getMinutes()
  }

  const timestamp = `at ${tstamp.getHours()}:${minutes}, on ${tstamp.getDate()}/${tstamp.getMonth()}/${tstamp.getFullYear()}`

  return (
    <div className='post glass'>
      { openReply && <ReplyForm post_id={post.id} username={post.poster.username} avatar={post.poster.profile.image} timestamp={timestamp} post_content={post.content} handleClose={handleClose} openReply={openReply} />}
      <div className="row post-header">
        <div className="col-2" style={{paddingTop: "5px"}}>
          <Avatar src={post.poster.profile.image} style={{marginLeft: "auto", marginRight: "auto"}} alt={post.poster.username} />
        </div>
        <div className="col">
          {post.poster.username} <br/>
          {timestamp}
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
          { post.user_liked ?
          <FavoriteIcon className='post-icons favorite' onClick={() => likePost(post.id, post.user_liked)} />  :
          <FavoriteBorderIcon className='post-icons favorite' onClick={() => likePost(post.id, post.user_liked)} />
          }
          {post.likes_count}
        </div>
        <div className="col-2">
          <ChatBubbleOutlineIcon className='post-icons comment' onClick={handleOpen} />
          {post.replies.length}
        </div>
        { auth.user.pk === post.poster.id &&
          <div className="col" style={{textAlign: "right"}}>
            <EditIcon className='post-icons edit' onClick={() => editPost(post.id)} />
            <DeleteIcon className='post-icons delete' onClick={() => deletePost(post.id)} />
          </div>
        }
      </div>
    </div>
  )
}

export default Post
