import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import isErrorReducer from './reducers/isErrorReducer'
import blogsReducer from './reducers/blogsReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  isError: isErrorReducer,
  blogs: blogsReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store