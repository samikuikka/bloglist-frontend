import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginServices from './services/login'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  //Adding blogs
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  //Notification
  const [message, setMessage] = useState(null)
  const [isError, setError] = useState(true)


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

      setError(false)
      setMessage('Logged in!')
      setTimeout(()=> {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setError(true)
      setMessage('Wrong username or password')
      setTimeout(()=> {
        setMessage(null)
      }, 3000)
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
        console.log(blog)

        setError(false)
        setMessage(`a new blog "${blog.title}" by ${blog.author} added.`)
        setTimeout(()=> {
          setMessage(null)
        }, 3000)
      })
  }

  if(user === null) {
    return (
      <div>
          <Notification message={message} isError={isError} />
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
      <Notification message={message} isError={isError} />
      <div>
        <p>{user.name} logged in. <button type="button" onClick={handleLogout}>logout</button></p>
      </div>

      <Togglable buttonLabel='create new blog'>
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
      </Togglable>
    
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App