import React, { useState } from 'react'

const Blog = ({ blog, increaseLike, deleteBlog, user }) => {
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
    <div className="blog" >
      <div style={hideStyle} className='hideStyle'>
        {blog.title} {blog.author} <button id="view-button" onClick={toggleVisibility}>view</button>
      </div>
      <div style={showStyle} className={'showStyle'}>
        {blog.title} <button onClick={toggleVisibility}>hide</button> <br/>
        {blog.url}<br/>
        <div id='likes'>{blog.likes}</div> <button id='like-button' onClick={increaseLike}>like</button><br/>
        {blog.author}<br/>
        {blog.user.username === user.username || blog.user === user.id ? <button onClick={deleteBlog}>remove</button> : ''}<br/>
      </div>
    </div>
  )
}

export default Blog