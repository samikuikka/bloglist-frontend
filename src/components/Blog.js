import React, {useState} from 'react'

const Blog = ({blog, increaseLike, deleteBlog, user}) => {
  const [visible, setVisible] = useState(false)
 
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const hideStyle = {
    display: visible ? 'none': '',
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showStyle = {
    display: visible ? '' : 'none',
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return(
    <div>
      <div style={hideStyle}>
        {blog.title} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showStyle}>
          {blog.title} <button onClick={toggleVisibility}>hide</button> <br/>
          {blog.url}<br/>
          {blog.likes} <button onClick={increaseLike}>like</button><br/>
          {blog.author}<br/>
          {blog.user.username === user.username ? <button onClick={deleteBlog}>remove</button> : ''}<br/>
      </div>
    </div>
  )
}

export default Blog