import { useState } from 'react'
import Button from './Button'

const AddForm = ({ onAdd, showAdd }) => {
  
  const [content, setContent] = useState('')
 
  const onClick = (e) => {
    e.preventDefault()

    if (!content) {
      alert('Please add text to your post!')
      return
    }

    onAdd({ content })

    setContent('')

  }

  return (
    <div className="add-form glass">
      <form>
        <h3>New Post:</h3>
        <div className="form-element">
          <textarea id="content" placeholder="Post here" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <div className="form-element">
          <Button text="Post" onClick={onClick} />
          <Button text="Discard" onClick={showAdd} />
        </div>
      </form>
    </div>
  )
}

export default AddForm
