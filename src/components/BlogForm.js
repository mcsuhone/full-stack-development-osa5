import React, {useState} from 'react'

const BlogForm = ({createBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    setTitle('')
    setAuthor('')
    setUrl('')
    await createBlog({title, author, url})
  }

  
  
  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div> 
          title <input type='text' onChange={(event) => setTitle(event.target.value)} value={title}/>
        </div>
        <div>
          author <input type='text' onChange={(event) => setAuthor(event.target.value)} value={author}/>
        </div>
        <div>
          url <input type='text' onChange={(event) => setUrl(event.target.value)} value={url}/>
        </div>
        <div>
          <button type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm