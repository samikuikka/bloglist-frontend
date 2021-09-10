import React from 'react'

const CreateForm = (props) => {
    return(
        <form onSubmit={props.onSubmit} >
        <div>
          title
          <input
          type="text"
          value={props.title}
          name="Title"
          onChange={props.onTitleChange}
          />
        </div>
        <div>
          author
          <input
          type="text"
          value={props.author}
          name="Author"
          onChange={props.onAuthorChange}
          />
        </div>
        <div>
          url
          <input
          type="text"
          value={props.url}
          name="Url"
          onChange={props.onUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    )
}

export default CreateForm