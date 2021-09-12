import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders blog title and author but no url and number of likes', () => {
  const blog = {
    title: 'Blog tests',
    author: 'Loon',
    url: 'test url',
    likes: 10,
    user: {
      username: 'Loon'
    }
  }

  const increaseLike = jest.fn()
  const deleteBlog = jest.fn()
  const user = {
    token: 'abcdefg',
    username: 'Loon',
    name: 'Sami',
    id: '123456'
  }

  const component = render(
    <Blog blog={blog} increaseLike={increaseLike} deleteBlog={deleteBlog} user={user} />
  )

  component.debug()

  const div = component.container.querySelector('.hideStyle')
  expect(div).toHaveTextContent('Blog tests Loon')

  expect(div).not.toHaveTextContent('test url')
  expect(div).not.toHaveTextContent('10')

})