import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import { login } from './services/loginService'
import blogService from './services/blogService'

const App = () => {
  const [username, setNewUsername] = useState('')
  const [password, setNewPassword] = useState('')
  const [userToken, setUserToken] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    async function fetchData() {
      console.log('fetching blogs ...')
      const response = await blogService.getAll()
      console.log('blogs fetched')
      setBlogs(response.data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      console.log('User already logged in')
      const user = JSON.parse(loggedUserJSON)
      setUserToken(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const returnedToken = await login({username, password})
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(returnedToken)
      )
      setUserToken(returnedToken)
      setNewUsername('')
      setNewPassword('')
      console.log('User logged in')
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value)
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUserToken(null)
    console.log('logged out')
  }

  if (userToken === null) {
    return (
      <div>
        <LoginForm onSubmitFunc={handleLogin} 
          valueUsername={username}
          valuePassword={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{userToken.data.username} logged in<button onClick={logout}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App