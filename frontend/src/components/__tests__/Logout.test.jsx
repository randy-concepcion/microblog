import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Logout from '../Logout'
import axios from 'axios'

jest.useFakeTimers()

describe('User interacts with Logout component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
    delete window.location
  })

  test('Logout should render Logout form component correctly', async () => {
    render(<Logout />)

    expect(await screen.getByTestId('test-logout-message')).toBeInTheDocument()
  })

  test('User logs out clears access and refresh tokens', async () => {
    jest.mock('axios')
    axios.post = jest.fn().mockResolvedValue({
      data: {
        success: 'success!'
      }
    })

    const mockAccessToken = 'my-access-token'
    localStorage.setItem('token', mockAccessToken)

    const mockRefreshToken = 'my-refresh-token'
    localStorage.setItem('refreshToken', mockRefreshToken)

    render(<Logout />)
    jest.advanceTimersByTime(500)

    expect(await screen.getByTestId('test-logout-message')).toBeInTheDocument()
    expect(window.location).toBe('/')
    expect(axios.post).toHaveBeenCalledTimes(2)
    expect(axios.post).toHaveBeenNthCalledWith(
      1,
      '/api/logout/access',
      {},
      {
        headers: {
          Authorization: `Bearer ${mockAccessToken}`
        }
      }
    )
    expect(axios.post).toHaveBeenNthCalledWith(
      2,
      '/api/logout/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${mockRefreshToken}`
        }
      }
    )
  })
})
