import { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from './Button'
import { useSelector } from 'react-redux'

const EditForm = ({ openEdit, handleClose, post }) => {
  
  const auth = useSelector((state) => state.auth)
  const [edit, setEdit] = useState(post.content)

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

  // set text content while block event bubbling
  const typeEdit = (e) => {
    e.stopPropagation()
    setEdit(e.target.value)
  }

  // updates the post after checking if the post has text in it
  const onClick = async (e) => {

    e.preventDefault()
    e.stopPropagation()

    if (!edit) {
      alert('Please add text!')
      return
    }
    console.log('This would post the edit!')
    post.content = edit
    
    var url = `http://localhost:8000/api/update-post/${post.id}`
    var method = 'POST'

    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-type':'application/json',
        'Authorization': 'Bearer ' + auth.access_token
      },
      body:JSON.stringify(post)
    })

    handleClose(e)
  }
  
  return (
    <div>
      <Modal open={openEdit} onClose={(e) => handleClose(e)}>
        <Box sx={style} className='post glass'>
          <form>
              <div className="form-element">
                <textarea id="content" value={edit} onChange={(e) => typeEdit(e)} onClick={(e) => e.stopPropagation()}></textarea>
              </div>
              <div className="form-element">
                <Button text="Post Edit" onClick={onClick} />
              </div>
            </form>
        </Box>
      </Modal>
    </div>
  )
}

export default EditForm