import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const isError = useSelector(state => state.isError)
  const message = useSelector(state => state.notification)

  if (message === null) {
    return null
  }

  if(isError) {
    return (
      <div className="error">
        {message}
      </div>
    )
  } else {
    return (
      <div className="succes">
        {message}
      </div>
    )
  }
}

export default Notification