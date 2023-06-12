import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title but not author, url or likes', () => {
  const blog = {
    title: 'otsikko',
    author: 'kirjoittajan nimi',
    url: 'http://www.osoite.fi',
  }

  render(<Blog blog={blog} />)

  screen.getByText('otsikko')

  const author_element = screen.queryByText('kirjoittajan nimi')
  expect(author_element).toBeNull()

  const url_element = screen.queryByText('http://www.osoite.fi')
  expect(url_element).toBeNull()

  const likes_element = screen.queryByText('likes')
  expect(likes_element).toBeNull()
})

test('renders all information when view-button is pressed', async () => {
  const blog = {
    title: 'otsikko',
    author: 'kirjoittajan nimi',
    url: 'http://www.osoite.fi',
    user: {
      username: 'Matti',
    }
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  user.click(button)

  waitFor(() => {
    let element = screen.queryByText('otsikko')
    expect(element).not.toBeNull()

    element = screen.queryByText('kirjoittajan nimi')
    expect(element).not.toBeNull()

    element = screen.queryByText('http://www.osoite.fi')
    expect(element).not.toBeNull()

    element = screen.queryByText('likes')
    expect(element).not.toBeNull()

    element = screen.queryByText('Matti')
    expect(element).not.toBeNull()
  })

  
})