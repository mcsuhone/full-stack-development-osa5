import React, {useState} from 'react'

const LoginForm = ({handleLogin}) => {
  const [username, setNewUsername] = useState('')
  const [password, setNewPassword] = useState('')
  
  const submitLogin = (event) => {
    event.preventDefault()
    setNewUsername('')
    setNewPassword('')
    handleLogin({username, password})
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
        <div>username <input type='text' onChange={handleUsernameChange} value={username}/></div>
        <div>password <input type='text' onChange={handlePasswordChange} value={password}/></div>
        <div><button type='submit'>login</button></div>
      </form>
    </div>
  )
}

export default LoginForm
