import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginServices from './services/login'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginServices.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }


  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = async(event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject)
      .then(blog => {
        setBlogs(blogs.concat(blog))
        setTitle('')
        setAuthor('')
        setUrl('')
      })
  }

  if(user === null) {
    return (
      <div>
          <LoginForm
           onSubmit={handleLogin}
           username={username}
           onUserNameChange={({ target }) => setUsername(target.value)}
           password={password}
           onPasswordChange={({ target }) => setPassword(target.value)}
           />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <div>
        <p>{user.name} logged in. <button type="button" onClick={handleLogout}>logout</button></p>
      </div>

      <h2>create new</h2>

      <CreateForm
        onSubmit={addBlog}
        title={title}
        onTitleChange={({target}) => setTitle(target.value)}
        author={author}
        onAuthorChange={({target}) => setAuthor(target.value)}
        url={url}
        onUrlChange={({target}) => setUrl(target.value)}
      />
    
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App