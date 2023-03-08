import React from 'react'

const LoginForm = ({onSubmitFunc, valueUsername, valuePassword, handleUsernameChange, handlePasswordChange}) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={onSubmitFunc}>
      <div>username <input type='text' onChange={handleUsernameChange} value={valueUsername}/></div>
      <div>password <input type='text' onChange={handlePasswordChange} value={valuePassword}/></div>
      <div><button type='submit'>login</button></div>
    </form>
  </div>
)

export default LoginForm
