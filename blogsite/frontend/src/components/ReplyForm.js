import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

const ReplyForm = ({ id, showAddReply, showReplyForm }) => {
  return (
    <div>
      <Modal open={showAddReply} onClose={showReplyForm}>
        <Box>
          
        </Box>
      </Modal>
    </div>
  )
}

export default ReplyForm
