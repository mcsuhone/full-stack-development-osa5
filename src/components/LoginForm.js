import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setNewUsername] = useState('')
  const [password, setNewPassword] = useState('')

  const submitLogin = (event) => {
    event.preventDefault()
    setNewUsername('')
    setNewPassword('')
    handleLogin({ username, password })
  }

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value)
  }

  return (
    <div>
      <form onSubmit={submitLogin}>
        <div>username <input id='username' type='text' onChange={handleUsernameChange} value={username}/></div>
        <div>password <input id='password' type='text' onChange={handlePasswordChange} value={password}/></div>
        <div><button id='login-button' type='submit'>login</button></div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
