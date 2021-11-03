const Button = ({ text, onClick }) => {
  return (
      <button type="button" onClick={onClick} className={`btn btn-${text === 'Discard' ? 'danger' : 'primary' }`}>{text}</button>
  )
}

export default Button
