import { useState, useEffect } from 'react'
import Post from './Post'
import Button from './Button'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Divider } from '@mui/material';

const PostPage = ({ closePage, openPost, likePost, deletePost, editPost, replyPost, postDetail, replies, setReplies }) => {

  const [reply, setReply] = useState('')
  const [pageReplies, setPageReplies] = useState([])

  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { loginUser, logoutUser, updateTokens } = bindActionCreators(actionCreators, dispatch)

  const post_id = openPost.id

  const onClick = () => {
    closePage()
  }

  // ability to reply to posts/replies, like the posts and replies
  // Set reply while block event bubbling
  const typeReply = (e) => {
    e.stopPropagation()
    setReply(e.target.value)
  }

  // Add a reply to a post
  const onButtonClick = (e) => {

    e.preventDefault()
    e.stopPropagation()

    if (!reply) {
      alert('Please add text to your reply!')
      return
    }

    replyPost({ reply, post_id })
    setReply('')
  }


  return (
    <>
      <ArrowBackIcon onClick={onClick} className="arrow-back" />
      <Post key={openPost.id} post={openPost} likePost={likePost} deletePost={deletePost} editPost={editPost} replyPost={replyPost} postDetail={postDetail} />
      <Divider />
      <div className="add-form glass">
        <form>
          <div className="form-element">
            <textarea id="content" placeholder="Type your reply here" value={reply} onChange={(e) => typeReply(e)} onClick={(e) => e.stopPropagation()}></textarea>
          </div>
          <div className="form-element">
            <Button text="Reply" onClick={onButtonClick} />
          </div>
        </form>
      </div>
      <Divider />
      <div></div>
      { replies.length > 0 &&
        replies.map((reply) => (
          <div>
              <Post key={reply.id} post={reply} likePost={likePost} deletePost={deletePost} editPost={editPost} replyPost={replyPost} postDetail={postDetail} />
          </div>
        ))
      }
    </>
    
  )
}

export default PostPage
