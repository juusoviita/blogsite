// import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import Post from './Post'
import PostPage from './PostPage'

const Posts = ({ posts, likePost, deletePost, editPost, replyPost }) => {
  
  const handleOpenDetail = () => onPostPage(true)
  const handleCloseDetail = () => onPostPage(false)

  const auth = useSelector((state) => state.auth)
  const replies = useSelector((state) => state.replies)
  const onpage = useSelector((state) => state.onpage)
  const indpost = useSelector((state) => state.indpost)
  const dispatch = useDispatch()

  const { addAllReplies, onPostPage, addPost } = bindActionCreators(actionCreators, dispatch)

  const postDetail = async (post_id) => {

    var url = `http://localhost:8000/api/post-detail/${post_id}`
    const fetchPost = async () => {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-type':'application/json',
          'Authorization': 'Bearer ' + auth.access_token
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
        addPost(data)
      }
    }
    await fetchPost()

    
    const fetchReplies = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/get-replies/${post_id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + auth.access_token
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
        addAllReplies(repl)
      }
    }
    await fetchReplies()

    handleOpenDetail()
  }

  return (
    <>
      { onpage ?
        <PostPage closePage={handleCloseDetail} likePost={likePost} deletePost={deletePost} editPost={editPost} replyPost={replyPost} postDetail={postDetail} />
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