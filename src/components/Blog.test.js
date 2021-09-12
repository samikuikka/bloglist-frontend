import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('blog tests:', () => {
  let blog
  let increaseLike
  let deleteBlog
  let user

  beforeEach( () => {
    blog = {
      title: 'Blog tests',
      author: 'Loon',
      url: 'test url',
      likes: 10,
      user: {
        username: 'Loon'
      }
    }

    increaseLike = jest.fn()
    deleteBlog = jest.fn()
    user = {
      token: 'abcdefg',
      username: 'Loon',
      name: 'Sami',
      id: '123456'
    }

  })

  test('renders blog title and author but no url and number of likes', () => {

    const component = render(
      <Blog blog={blog} increaseLike={increaseLike} deleteBlog={deleteBlog} user={user} />
    )

    component.debug()

    const div = component.container.querySelector('.hideStyle')
    expect(div).toHaveTextContent('Blog tests Loon')

    expect(div).not.toHaveTextContent('test url')
    expect(div).not.toHaveTextContent('10')
  })

  test('blog url and number of likes shown when "view" button clicked', () => {

    const component = render(
      <Blog blog={blog} increaseLike={increaseLike} deleteBlog={deleteBlog} user={user} />
    )

    const div = component.container.querySelector('.showStyle')
    expect(div).toHaveStyle({ display: 'none' })

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(div).not.toHaveStyle({ display: 'none' })
    expect(div).toHaveTextContent('test url')
    expect(div).toHaveTextContent('10')

  })

  test('if like button clicked twice, it executes increaseLike only twice', () => {

    const component = render(
      <Blog blog={blog} increaseLike={increaseLike} deleteBlog={deleteBlog} user={user} />
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(increaseLike.mock.calls).toHaveLength(2)

  })


})

