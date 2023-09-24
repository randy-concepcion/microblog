import { render, screen } from '@testing-library/react'
import axios from 'axios'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Login from '../Login'

// TODO: We may want to consider using 'msw' to avoid mocking
//       specifically axios and use a mock server instead
//       which allows for refactoring the implementation
//       without changing these tests
//       References:
//       - https://kentcdodds.com/blog/stop-mocking-fetch#then-i-discovered-msw
//       - https://stackoverflow.com/questions/67101502/how-to-mock-axios-with-jest

describe('User interacts with Login component', () => {
  // When logging in, there will be two axios calls
  // to check for token expiration and to log in
  // Each one will have a different response, respectively

  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  test('User logs in with valid credentials', async () => {
    jest.mock('axios')
    axios.post = jest.fn().mockResolvedValue({
      data: {
        success: 'success!'
      }
    })

    const mockToken = 'my-stored-token'
    localStorage.setItem('token', mockToken)

    await render(<Login />)
    const email = screen.getByTestId('test-email')
    const password = screen.getByTestId('test-password')
    const submit = screen.getByTestId('test-submit-button')

    await userEvent.type(email, 'test@test.com')
    await userEvent.type(password, 'test')
    await userEvent.click(submit)

    expect(axios.post).toHaveBeenCalledTimes(2)
    expect(axios.post).toHaveBeenNthCalledWith(
      1,
      '/api/token_expiration',
      {},
      {
        headers: {
          Authorization: `Bearer ${mockToken}`
        }
      }
    )
    expect(axios.post).toHaveBeenNthCalledWith(
      2,
      '/api/login',
      {
        email: 'test@test.com',
        pwd: 'test'
      }
    )
  })

  test('User logs in with no credentials', async () => {
    jest.mock('axios')
    axios.post = jest.fn().mockResolvedValue({
      data: {
        error: 'Invalid form'
      }
    })

    const mockToken = 'my-stored-token'
    localStorage.setItem('token', mockToken)

    render(<Login />)
    const submit = screen.getByTestId('test-submit-button')

    await userEvent.click(submit)

    expect(axios.post).toHaveBeenCalledTimes(2)
    expect(axios.post).toHaveBeenNthCalledWith(
      1,
      '/api/token_expiration',
      {},
      {
        headers: {
          Authorization: `Bearer ${mockToken}`
        }
      }
    )
    expect(axios.post).toHaveBeenNthCalledWith(
      2,
      '/api/login',
      {
        email: '',
        pwd: ''
      }
    )
  })
})
