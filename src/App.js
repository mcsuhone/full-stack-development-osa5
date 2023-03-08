import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { login } from './services/loginService'
import blogService from './services/blogService'

const App = () => {
  const [username, setNewUsername] = useState('')
  const [password, setNewPassword] = useState('')
  const [user, setUserToken] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('notification')


  const setTimedNotification = (message, type='notification') => {
    setNotificationType(type)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)
  }

  useEffect(() => {
    async function fetchData() {
      console.log('fetching blogs ...')
      const response = await blogService.getAll()
      console.log('blogs fetched')
      setBlogs(response)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      console.log('User already logged in')
      const loggedUser = JSON.parse(loggedUserJSON)
      setUserToken(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const returnedUser = await login({username, password})
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(returnedUser)
      )
      blogService.setToken(returnedUser.token)
      setUserToken(returnedUser)
      setNewUsername('')
      setNewPassword('')
      console.log('User logged in')
    } catch (error) {
      setTimedNotification('wrong username or password', 'warning')
      console.log(error.response.data.error)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url,
    }

    try {
      const addedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(addedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimedNotification(`a new blog ${addedBlog.title} by ${addedBlog.author} added`)
    } catch(error) {
      setTimedNotification(error.response.data.error, 'warning')
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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage} type={notificationType} />
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

      <Notification message={notificationMessage} type={notificationType} />

      <p>{user.username} logged in<button onClick={logout}>logout</button></p>
      
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>title: <input type='text' onChange={(event) => setTitle(event.target.value)} value={title}/></div>
        <div>author: <input type='text' onChange={(event) => setAuthor(event.target.value)} value={author}/></div>
        <div>url: <input type='text' onChange={(event) => setUrl(event.target.value)} value={url}/></div>
        <div><button type='submit'>create</button></div>
      </form>

      <p></p>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App