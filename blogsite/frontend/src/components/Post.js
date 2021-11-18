// import { FavoriteIcon, FavoriteBorderIcon, ChatBubbleOutlineIcon, EditIcon, DeleteIcon  } from '@mui/icons-material';
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

const Post = ({post, likePost, deletePost, editPost, replyPost }) => {
  
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { loginUser, logoutUser, updateTokens } = bindActionCreators(actionCreators, dispatch)

  // check whether the logged in user has liked this post
  let user_liked = false
  if (post.likes.length > 0) {
    for (let i = 0; i < post.likes.length; i++) {
      if (post.likes[i].liker === auth.user.pk) {
        user_liked = true
        break
      }
    }
  }

  console.log(post)

  const tstamp = new Date(post.timestamp)
  
  let minutes = ''
  if (tstamp.getMinutes() < 10) {
    minutes = `0${tstamp.getMinutes()}`
  } else {
    minutes = tstamp.getMinutes()
  }

  const timestamp = `at ${tstamp.getHours()}:${minutes}, on ${tstamp.getDate()}/${tstamp.getMonth()}/${tstamp.getFullYear()}`

  return (
    <div key={post.id} className='post glass'>
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
          { user_liked ?
          <FavoriteIcon className='post-icons favorite' onClick={() => likePost(post.id, user_liked)} />  :
          <FavoriteBorderIcon className='post-icons favorite' onClick={() => likePost(post.id, user_liked)} />
          }
          {post.likes.length}
        </div>
        <div className="col-2">
          <ChatBubbleOutlineIcon className='post-icons comment' onClick={() => replyPost(post.id)} />
          {post.replies.length}
        </div>
        { auth.user.pk === post.poster &&
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
