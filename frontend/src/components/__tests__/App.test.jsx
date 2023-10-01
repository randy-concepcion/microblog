import { act, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import axios from 'axios'
import App from '../App'

describe('User interacts with Login component', () => {
  // When logging in, there will be two axios calls
  // to check for token expiration and to log in
  // Each one will have a different response, respectively

  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  test('App should render App fragment component correctly for Home page', async () => {
    jest.mock('axios')
    axios.post = jest.fn()
    axios.post.mockResolvedValueOnce({
      error: 'Call to /api/token_expiration has failed. Test causes an error.'
    })

    await act(async () => { render(<App />) })

    expect(await screen.getByTestId('test-navbar')).toBeInTheDocument()

    const allLinks = await screen.getAllByRole('link')
    expect(allLinks[0]).toHaveAttribute('href', '/')
    expect(allLinks[1]).toHaveAttribute('href', '/login')
    expect(allLinks[2]).toHaveAttribute('href', '/register')

    // The Home page component is rendered
    expect(await screen.getByTestId('test-login-button')).toBeInTheDocument()
    expect(await screen.getByTestId('test-register-button')).toBeInTheDocument()
    expect(await screen.getByTestId('test-post')).toBeInTheDocument()
  })

  test('App should render App fragment component correctly for Main page', async () => {
    jest.mock('axios')
    axios.post = jest.fn()
    axios.post.mockImplementation((url) => {
      switch (url) {
        case '/api/token_expiration':
          return {
            data: {
              success: true
            }
          }
        case '/api/refresh_token':
          return {
            data: {
              token: 'my-refresh-token'
            }
          }
        default:
          return {
            error: 'An error has occurred with your test'
          }
      }
    })
    axios.get = jest.fn()
    axios.get.mockResolvedValueOnce(
      {
        data: [
          {
            id: '1',
            title: 'test title',
            content: 'test content',
            user: '1'
          }
        ]
      }
    )

    const mockToken = 'my-stored-token'
    localStorage.setItem('token', mockToken)
    await act(async () => { render(<App />) })

    expect(await screen.getByTestId('test-navbar')).toBeInTheDocument()

    const allLinks = await screen.getAllByRole('link')
    expect(allLinks[0]).toHaveAttribute('href', '/')
    expect(allLinks[1]).toHaveAttribute('href', '/logout')
    expect(allLinks[2]).toHaveAttribute('href', '/register')

    // The Main page component is rendered
    expect(await screen.getByTestId('test-main-posts')).toBeInTheDocument()
    expect(await screen.getByTestId('test-posts-list')).toBeInTheDocument()
  })
})
