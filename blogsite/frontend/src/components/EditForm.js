import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from './Button'
import { useState } from 'react'


const editForm = ({ openEdit, handleClose, text }) => {
  
  const [edit, setEdit] = useState('')

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

  // Set text content while block event bubbling
  const typeEdit = (e) => {
    e.stopPropagation()
    setEdit(e.target.value)
  }

  const onClick = async (e) => {

    e.preventDefault()
    e.stopPropagation()

    if (!text) {
      alert('Please add text!')
      return
    }
    console.log('This would post the edit!')
    console.log(edit)
    handleClose(e)
  }
  
  return (
    <div>
      <Modal open={openEdit} onClose={(e) => handleClose(e)}>
        <Box sx={style} className='post glass'>
          <form>
              <div className="form-element">
                <textarea id="content" value={text} onChange={(e) => typeEdit(e)} onClick={(e) => e.stopPropagation()}></textarea>
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

export default editForm