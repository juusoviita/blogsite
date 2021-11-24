import React from 'react'
import { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar';
import Button from './Button'
import { Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'

const ReplyForm = ({ post_id, username, avatar, timestamp, post_content, handleClose, openReply }) => {

  const [content, setContent] = useState('')

  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { loginUser, logoutUser, updateTokens } = bindActionCreators(actionCreators, dispatch)

  // style variable
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  console.log(post_id)

  // Add a reply to a post
  const addPost = async (reply, post_id) => {

    const poster = auth.user.pk

    console.log(poster)
    console.log(reply)
    console.log(post_id)

    /*
    {
      "poster": 7,
      "content": "APIView practice post",
      "last_updated": null,
      "replies_to": 37,
      "replies": [],
      "likes": []
    }
    */

    const newPost = {
      poster: poster,
      content: reply,
      last_updated: null,
      replies_to: post_id,
      replies: [],
      likes: []
    }

    const url = 'http://127.0.0.1:8000/api/create-post/'
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
      body:JSON.stringify(newPost) 
    })

    const data = await res.json()
    console.log(data)
    console.log(typeof data)
    if(res.status !== 200) {
      logoutUser()
    }
    handleClose()
  }
  
  // fetch all the previous replies to this post as well?

  return (
    <div>
      <Modal open={openReply} onClose={handleClose}>
        <Box sx={style}>
          <div className="row post-header">
          <div className="col-2" style={{paddingTop: "5px"}}>
            <Avatar src={avatar} style={{marginLeft: "auto", marginRight: "auto"}} alt={username} />
          </div>
          <div className="col">
            {username} <br/>
            {timestamp}
          </div>
          </div>
          <Divider />
          <div className="row">
              <div className="col post-content">
                {post_content}
              </div>
          </div>
          <Divider />
          <div className="row">
          <form>
            <div className="form-element">
              <textarea id="content" placeholder="Reply here" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </div>
            <div className="form-element">
              <Button text="Reply" onClick={() => addPost(content, post_id)} />
            </div>
          </form>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ReplyForm
