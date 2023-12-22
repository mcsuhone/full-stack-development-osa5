import PropTypes from 'prop-types'

const Togglable = ({ id, buttonLabel, onClick, visible, children }) => {

  if (visible) {
    return (
      <div>
        {children}
        <button id={id} className='toggle-button' onClick={onClick}>cancel</button>
      </div>
    )
  }
  return (
    <div>
      <button id={id} className='toggle-button' onClick={onClick}>{buttonLabel}</button>
    </div>
  )
}

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  id: PropTypes.string,
  buttonLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
}

export default Togglable