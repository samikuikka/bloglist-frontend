import blogServices from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'LIKE': {
    const id = action.data.id
    const blog = state.find(a => a.id === id)
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    return state.map(a => a.id === id ? changedBlog : a)
  }
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'START':
    return action.data
  case 'DELETE': {
    const id = action.data
    return state.filter(b => b.id !== id)
  }
  default: return state
  }
}

export const initialize = () => {
  return async dispatch => {
    const blogs = await blogServices.getAll()
    dispatch({
      type: 'START',
      data: blogs
    })
  }
}

export const createBlog = (data) => {
  return async dispatch => {
    const newBlog = await blogServices.create(data)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const like = (blog) => {
  return async dispatch => {
    const object = {
      ...blog,
      likes: blog.likes +1
    }
    const updated = await blogServices.update(blog.id, object)
    dispatch({
      type: 'LIKE',
      data: updated
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogServices.deleteBlog(id)
    dispatch({
      type: 'DELETE',
      data: id
    })
  }
}

export default reducer