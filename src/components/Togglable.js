import React, {useState, useImperativeHandle, forwardRef} from 'react'

const Togglable = forwardRef(function TogglableFunc(props, ref) {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  if (visible) {
    return (
      <div>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    )
  }
  return (
    <div>
      <button onClick={toggleVisibility}>{props.buttonLabel}</button>
    </div>
  )
})

export default Togglable