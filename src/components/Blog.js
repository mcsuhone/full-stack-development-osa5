import React, {useState} from 'react'

const Blog = ({blog, updateBlog}) => {
  const blogStyle = {
    paddingTop: 3,
    paddingLeft: 3,
    paddingBottom: 3,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [showFullBlog, setShowFullBlog] = useState(false)
  
  const toggleVisibility = () => {
    setShowFullBlog(!showFullBlog)
  }

  const addLike = () => {
    updateBlog({ title: blog.title, author: blog.author, url: blog.url, likes: blog.likes + 1, user: blog.user.id, id: blog.id })
  }

  console.log(blog)
  
  if (showFullBlog) {
    return (
      <div style={blogStyle}>
        {blog.title} - {blog.author} <button onClick={toggleVisibility}>hide</button><br/>
        {blog.url} <br/>
        likes {blog.likes} <button onClick={addLike}>like</button><br/>
        {blog.user.username}
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author} <button onClick={toggleVisibility}>view</button>
    </div>
  )
}

export default Blog