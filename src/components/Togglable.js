import PropTypes from 'prop-types'

const Togglable = ({ buttonLabel, onClick, visible, children }) => {

  if (visible) {
    return (
      <div>
        {children}
        <button className='toggle-button' onClick={onClick}>cancel</button>
      </div>
    )
  }
  return (
    <div>
      <button className='toggle-button' onClick={onClick}>{buttonLabel}</button>
    </div>
  )
}

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
}

export default Togglable