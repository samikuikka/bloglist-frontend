import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateForm from './CreateForm'

test('<CreateForm /> createBlog event handler gets right props for blog creation', () => {
  const createBlog = jest.fn()

  const component = render(
    <CreateForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')


  fireEvent.change( titleInput, {
    target: { value: 'Test title' }
  })
  fireEvent.change( authorInput, {
    target: { value: 'Tester Tom' }
  })
  fireEvent.change( urlInput, {
    target: { value: 'test url' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test title')
  expect(createBlog.mock.calls[0][0].author).toBe('Tester Tom')
  expect(createBlog.mock.calls[0][0].url).toBe('test url')

})