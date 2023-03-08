import React from 'react'

const BlogForm = ({onSubmitFunc, handleTitleChange, handleAuthorChange, handleUrlChange, title, author, url}) => (
  <div>
    <h2>create new blog</h2>
    <form onSubmit={onSubmitFunc}>
      <div>title <input type='text' onChange={handleTitleChange} value={title}/></div>
      <div>author <input type='text' onChange={handleAuthorChange} value={author}/></div>
      <div>url <input type='text' onChange={handleUrlChange} value={url}/></div>
      <div><button type='submit'>create</button></div>
    </form>
  </div>
)

export default BlogForm