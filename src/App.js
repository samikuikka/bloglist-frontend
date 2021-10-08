import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginServices from './services/login'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setError } from './reducers/isErrorReducer'
import { initialize, createBlog, like, removeBlog } from './reducers/blogsReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(initialize())
  }, [dispatch])

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

      dispatch(setError(false))
      dispatch(setNotification('Logged in!'))

    } catch (exception) {
      dispatch(setError(true))
      dispatch(setNotification('Wrong username or password'))
    }
  }

  //LIKE FUNCTIONALITY
  const increaseLike = id => {
    const blog = blogs.find(blog => blog.id === id)
    dispatch(like(blog))
  }


  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.clear()
  }

  //ADDING BLOGS
  const addBlog = (blogObject) => {
    try {
      dispatch(createBlog(blogObject))
      dispatch(setError(false))
      dispatch(setNotification(`a new blog "${blogObject.title}" by ${blogObject.author} added.`))
    } catch(error) {
      dispatch(setError(true))
      dispatch(setNotification(`${error}`))
    }
  }

  //DELETING BLOGS
  const deleteBlog = id => {
    const blog = blogs.find(blog => blog.id === id)
    const result = window.confirm(`Remove ${blog.title} by ${blog.author}?`)
    console.log(blog)

    if(result) {
      try {
        dispatch(removeBlog(id))
        dispatch(setError(false))
        dispatch(setNotification(`${blog.title} deleted!`))
      } catch(error) {
        dispatch(setError(true))
        dispatch(setNotification(`Error in deleting a person: ${error.response.data.error}`))
      }
    }
  }


  if(user === null) {
    return (
      <div>
        <Notification />
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
      <Notification />
      <div>
        <p>{user.name} logged in. <button type="button" onClick={handleLogout}>logout</button></p>
      </div>

      <Togglable buttonLabel='create new blog'>
        <h2>create new</h2>
        <CreateForm
          createBlog={addBlog}
        />
      </Togglable>
      <div className='blogs'>
        {blogs.sort((x,y) => y.likes - x.likes).map(blog =>
          <Blog key={blog.id} blog={blog} increaseLike={() => increaseLike(blog.id)} deleteBlog={() => deleteBlog(blog.id)} user={user} />
        )}
      </div>
    </div>
  )
}

export default App