// import { FavoriteIcon, FavoriteBorderIcon, ChatBubbleOutlineIcon, EditIcon, DeleteIcon  } from '@mui/icons-material';
import { useState, useEffect } from 'react'
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
import EditForm from './EditForm';

const Post = ({post, likePost, deletePost, editPost, replyPost, postDetail }) => {
  
  const onpage = useSelector((state) => state.onpage)
  const indpost = useSelector((state) => state.indpost)
  const auth = useSelector((state) => state.auth)
  const replies = useSelector((state) => state.replies)
  const onprofile = useSelector((state) => state.onprofile)
  const indprofile = useSelector((state) => state.indprofile)
  const posts = useSelector((state) => state.posts)
  const dispatch = useDispatch()

  const { onProfilePage, addProfile } = bindActionCreators(actionCreators, dispatch)
  
  // to handle the opening and closing of the Reply modal
  const [openReply, setOpenReply] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  

  if (indpost.length !== 0 && post == null) {
    post = indpost
  }
  

  const handleOpen = (e) => {
    e.stopPropagation()
    setOpenReply(true)
  }

  const handleOpenEdit = (e) => {
    e.stopPropagation()
    setOpenEdit(true)
  }

  const handleClose = (e) => {
    e.stopPropagation()
    setOpenReply(false)
    setOpenEdit(false)
  }

  const toProfile = (poster, e) => {
    e.stopPropagation()
    addProfile(poster)
    onProfilePage(true)
  }


  // format the timestamp for the post
  var tstamp = ''
  if (post.last_updated === null) {
    tstamp = new Date(post.timestamp)
  } else {
    tstamp = new Date(post.last_updated)
  }
    
  
  let minutes = ''
  if (tstamp.getMinutes() < 10) {
    minutes = `0${tstamp.getMinutes()}`
  } else {
    minutes = tstamp.getMinutes()
  }

  const timestamp = `at ${tstamp.getHours()}:${minutes}, on ${tstamp.getDate()}/${tstamp.getMonth() + 1}/${tstamp.getFullYear()}`

    return (
      <div className='row justify-content-center'>
        <div key={post.id} className='post glass' onClick={() => postDetail(post.id)}>
          { openReply && <ReplyForm post_id={post.id} username={post.poster.username} avatar={post.poster.profile.image} timestamp={timestamp} post_content={post.content} handleClose={handleClose} openReply={openReply} replyPost={replyPost}  />}
          { openEdit && <EditForm openEdit={openEdit} handleClose={handleClose} post={post} /> }
          <div className="row post-header">
            <div className="col-2" style={{paddingTop: "5px"}}>
              <Avatar src={post.poster.profile.image} style={{marginLeft: "auto", marginRight: "auto"}} alt={post.poster.username} />
            </div>
            <div className="col-4">
              <p className="username" onClick={(e) => toProfile(post.poster, e)}>{post.poster.username}</p>
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
              <FavoriteIcon className='post-icons favorite' onClick={(e) => likePost(post.id, post.user_liked, e)} />  :
              <FavoriteBorderIcon className='post-icons favorite' onClick={(e) => likePost(post.id, post.user_liked, e)} />
              }
              {post.likes_count}
            </div>
            <div className="col-2">
              <ChatBubbleOutlineIcon className='post-icons comment' onClick={handleOpen} />
              { post.replies_count }
            </div>
            { auth.user.pk === post.poster.id &&
              <div className="col" style={{textAlign: "right"}}>
                <EditIcon className='post-icons edit' onClick={(e) => handleOpenEdit(e)} />
                <DeleteIcon className='post-icons delete' onClick={(e) => deletePost(post.id, e)} />
              </div>
            }
          </div>
        </div>
      </div>
  )
}

export default Post
