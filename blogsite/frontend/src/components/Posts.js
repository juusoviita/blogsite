import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import Post from './Post'
import PostPage from './PostPage'

const Posts = ({ posts, likePost, deletePost, editPost, replyPost }) => {
  
  // to handle the opening and closing of the PostDetail component
  const [openDetail, setOpenDetail] = useState(false)
  const [openPost, setOpenPost] = useState()
  const [replies, setReplies] = useState([])
  const handleOpenDetail = () => setOpenDetail(true)
  const handleCloseDetail = () => setOpenDetail(false)

  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { loginUser, logoutUser, updateTokens } = bindActionCreators(actionCreators, dispatch)

  const postDetail = async (post_id) => {
    
    var url = `http://localhost:8000/api/post-detail/${post_id}`
    const fetchPost = async () => {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-type':'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
      const data = await res.json()
      
      if (res.status === 200) {
        data.likes_count = data.likes.length
        data.replies_count = data.replies.length
        data.user_liked = false
        if (data.likes.length > 0) {
          for (let i = 0; i < data.likes.length; i++) {
            if (data.likes[i].liker === auth.user.pk) {
              data.user_liked = true
              break
            }
          }
        }
        setOpenPost(data)
        // setOpenPost(post_id)
      }
    }
    await fetchPost()

    
    const fetchReplies = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/get-replies/${post_id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
      const repl = await response.json()
      if(response.status === 200) {

        // check whether the logged in user has liked the post or not
        repl.forEach(post => {
          post.user_liked = false
          post.likes_count = post.likes.length
          post.replies_count = post.replies.length
          if (post.likes.length > 0) {
            for (let i = 0; i < post.likes.length; i++) {
              if (post.likes[i].liker === auth.user.pk) {
                post.user_liked = true
                break
              }
            }
          }
        })
        setReplies(repl)
      }
    }
    await fetchReplies()
    
    handleOpenDetail()
  }

  return (
    <>
      { openDetail ?
        <PostPage closePage={handleCloseDetail} openPost={openPost} likePost={likePost} deletePost={deletePost} editPost={editPost} replyPost={replyPost} postDetail={postDetail} replies={replies} />
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