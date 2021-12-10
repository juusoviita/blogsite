import { useState, useEffect } from 'react'
import Post from './Post'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PostPage = ({ closePage, openPost, likePost, deletePost, editPost, replyPost, postDetail  }) => {

  const [post, setPost] = useState([])

  /*
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { loginUser, logoutUser, updateTokens } = bindActionCreators(actionCreators, dispatch)
  */

  const onClick = () => {
    setPost([])
    closePage()
  }

  // retrieve all the replies to the post and use the Posts way of rendering them underneath the main post
  // ability to reply to posts/replies, like the posts and replies

  // <Post key={post.id} post={post} likePost={likePost} deletePost={deletePost} editPost={editPost} replyPost={replyPost} postDetail={postDetail} />

  return (
    <>
      <ArrowBackIcon onClick={onClick} className="arrow-back" />
      <Post key={openPost.id} post={openPost} likePost={likePost} deletePost={deletePost} editPost={editPost} replyPost={replyPost} postDetail={postDetail} />
      <div>Here's where you can type a reply to post {openPost.id}</div>
      <div>This section will display all the replies to this post, if any</div>
    </>
    
  )
}

export default PostPage
