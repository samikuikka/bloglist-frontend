import blogServices from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'START':
    return action.data
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

export default reducer