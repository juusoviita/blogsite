import { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar';
import Button from './Button'
import { Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'

const ReplyForm = ({ post_id, username, avatar, timestamp, post_content, handleClose, openReply, replyPost }) => {

  const [reply, setReply] = useState('')

  const onpage = useSelector((state) => state.onpage)
  const indpost = useSelector((state) => state.indpost)
  const dispatch = useDispatch()

  const { postNewReply } = bindActionCreators(actionCreators, dispatch)

  // style variable
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    boxShadow: 24,
    p: 4,
  };

  // set reply while block event bubbling
  const typeReply = (e) => {
    e.stopPropagation()
    setReply(e.target.value)
  }

  // add a reply to a post
  const onClick = async (e) => {

    e.preventDefault()
    e.stopPropagation()

    if (!reply) {
      alert('Please add text to your reply!')
      return
    }

    if (onpage === true && indpost.id === post_id) {
      const replyToState = await replyPost({ reply, post_id })
      replyToState.likes_count = replyToState.likes.length
      replyToState.replies_count = replyToState.replies.length
      postNewReply(replyToState)
    } else {
      replyPost({ reply, post_id })
    }
    handleClose(e)
    setReply('')
  }

  return (
    <div>
      <Modal open={openReply} onClose={(e) => handleClose(e)}>
        <Box sx={style} className='post glass'>
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
              <textarea id="content" placeholder="Type your reply here" value={reply} onChange={(e) => typeReply(e)} onClick={(e) => e.stopPropagation()}></textarea>
            </div>
            <div className="form-element">
              <Button text="Reply" onClick={onClick} />
            </div>
          </form>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ReplyForm
