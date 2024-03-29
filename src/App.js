import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { login } from './services/loginService'
import blogService from './services/blogService'


const App = () => {
  const [user, setUserToken] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [reloadState, setReloadBlogs] = useState(false)
  const [visible, setVisible] = useState(false)

  const notificationRef = useRef()

  const reloadBlogs = () => {
    setReloadBlogs(!reloadState)
  }

  useEffect(() => {
    async function fetchData() {
      console.log('fetching blogs ...')
      const response = await blogService.getAll()
      console.log('blogs fetched')
      setBlogs(response)
    }
    fetchData()
  }, [reloadState])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      console.log('User already logged in')
      const loggedUser = JSON.parse(loggedUserJSON)
      setUserToken(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLogin = async (credentials) => {
    try {
      const returnedUser = await login(credentials)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(returnedUser)
      )
      blogService.setToken(returnedUser.token)
      setUserToken(returnedUser)
      console.log('User logged in')
    } catch (error) {
      notificationRef.current.setTimedNotification('wrong username or password', 'warning')
      console.log(error.response.data.error)
    }
  }

  const createBlog = async (blog) => {
    try {
      const addedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(addedBlog))
      notificationRef.current.setTimedNotification(`a new blog ${addedBlog.title} by ${addedBlog.author} added`)
      reloadBlogs()
      toggleVisibility()
    } catch(error) {
      notificationRef.current.setTimedNotification(error.response.data.error, 'warning')
      console.log(error.response.data.error)
    }
  }

  const updateBlog = async (newBlog) => {
    try {
      const updatedBlog = await blogService.update(newBlog)
      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : { ...updatedBlog , user: blog.user }))
    } catch(error) {
      console.log(error.response.data.error)
    }
  }

  const removeBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)
      setBlogs(blogs.filter(blog => blog.id !== blogId))
    } catch(error) {
      console.log(error.response.data.error)
    }
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
        <Notification ref={notificationRef} />
        <LoginForm handleLogin={handleLogin}/>
      </div>
    )
  }

  const sortedBlogs = blogs.sort((a, b) => a.likes < b.likes ? 1 : -1)

  return (
    <div>

      <h2>blogs</h2>

      <Notification ref={notificationRef} />

      <p>{user.username} logged in <button id='logout-button' onClick={logout}>logout</button></p>

      <Togglable id='toggle-blog-form' buttonLabel='create new blog' onClick={toggleVisibility} visible={visible}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      <p></p>

      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user}/>
      )}
    </div>
  )
}

export default App