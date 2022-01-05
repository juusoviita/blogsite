import { useState, useEffect } from 'react'
import Post from './Post'
import Button from './Button'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Divider } from '@mui/material';

const PostPage = ({ closePage, openPost, likePost, deletePost, editPost, replyPost, postDetail }) => {

  const [post, setPost] = useState([])
  const [reply, setReply] = useState('')
  
  const auth = useSelector((state) => state.auth)
  const replies = useSelector((state) => state.replies)
  const dispatch = useDispatch()

  const { addAllReplies, postNewReply, clearAllReplies } = bindActionCreators(actionCreators, dispatch)

  const post_id = openPost.id

  useEffect(() => {
    console.log(`Opening the individual page for post ${openPost.id}`)
    setPost(openPost)
  }, [])

  const onClick = () => {
    clearAllReplies()
    closePage()
  }

  // ability to reply to posts/replies, like the posts and replies
  // Set reply while block event bubbling
  const typeReply = (e) => {
    e.stopPropagation()
    setReply(e.target.value)
  }

  // Add a reply to a post
  const onButtonClick = async (e) => {

    e.preventDefault()
    e.stopPropagation()

    if (!reply) {
      alert('Please add text to your reply!')
      return
    }

    const postReply = await replyPost({ reply, post_id })
    postReply.likes_count = postReply.likes.length
        postReply.replies_count = postReply.replies.length
        postReply.user_liked = false
        if (postReply.likes.length > 0) {
          for (let i = 0; i < postReply.likes.length; i++) {
            if (postReply.likes[i].liker === auth.user.pk) {
              postReply.user_liked = true
              break
            }
          }
        }

    setReply('')
    postNewReply(postReply)
  }


  return (
    <>
      <ArrowBackIcon onClick={onClick} className="arrow-back" />
      <Post key={openPost.id} post={openPost} likePost={likePost} deletePost={deletePost} editPost={editPost} replyPost={replyPost} postDetail={postDetail} repliesCount={replies.length} />
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
