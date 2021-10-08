const isErrorReducer = (state = true, action) => {
  switch(action.type) {
  case 'SET_ERROR':
    return action.data
  default:
    return state
  }
}

export const setError = (boolean) => {
  return {
    type: 'SET_ERROR',
    data: boolean
  }
}

export default isErrorReducer