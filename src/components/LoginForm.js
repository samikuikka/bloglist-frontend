import React from 'react'


const LoginForm = (props) => {

  return(
    <form onSubmit={props.onSubmit}>
      <div>
              username
        <input
          id='username'
          type="text"
          value={props.username}
          name="Username"
          onChange={props.onUserNameChange}
        />
      </div>
      <div>
            password
        <input
          id='password'
          type="password"
          value={props.password}
          name="Password"
          onChange={props.onPasswordChange}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
}

export default LoginForm