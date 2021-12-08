import React from 'react'

const PostPage = ({ closePage, openPost }) => {

  // retrieve the whole post using the id in openPost
  // retrieve all the replies to the post and use the Posts way of rendering them underneath the main post
  // ability to reply to posts/replies, like the posts and replies

  return (
    <div onClick={closePage}>This is the individual post view for post {openPost}</div>
  )
}

export default PostPage
