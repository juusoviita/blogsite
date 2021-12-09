import { useState, useEffect } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PostPage = ({ closePage, openPost, likePost, deletePost, editPost, replyPost, postDetail  }) => {

  const [post, setPost] = useState([])

  // retrieve the whole post using the id in openPost
  useEffect(() => {
    var url = `http://localhost:8000/api/post-detail/${openPost}`
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-type':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
    .then(res => res.json())
    .then(json => {
      json.likes_count = json.likes.length
      json.replies_count = json.replies.length
      setPost(json)
    })
  }, [])

  // retrieve all the replies to the post and use the Posts way of rendering them underneath the main post
  // ability to reply to posts/replies, like the posts and replies

  return (
    <>
      <ArrowBackIcon onClick={closePage} className="arrow-back" />
      <div>This is the individual post view for post {post.id}</div>
    </>
    
  )
}

export default PostPage
