import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import Post from './Post'

const Posts = ({ posts, likePost, deletePost, editPost, replyPost }) => {
  
  // to handle the opening and closing of the PostDetail component
  const [openDetail, setOpenDetail] = useState(false)
  const [openPost, setOpenPost] = useState()
  const handleOpenDetail = () => setOpenDetail(true)
  const handleCloseDetail = () => setOpenDetail(false)

  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { loginUser, logoutUser, updateTokens } = bindActionCreators(actionCreators, dispatch)

  const postDetail = async (post_id) => {
    setOpenPost(post_id)
    handleOpenDetail()
    }


  return (
    <>
      { openDetail ?
        <div onClick={handleCloseDetail}>This is the individual post view for post {openPost}</div>
        :
        posts.map((post) => (
          <div>
            { post.replies_to === null &&
              <Post key={post.id} post={post} likePost={likePost} deletePost={deletePost} editPost={editPost} replyPost={replyPost} postDetail={postDetail} />
            }
          </div>
        ))
      }
    </>
  )
 }

export default Posts;