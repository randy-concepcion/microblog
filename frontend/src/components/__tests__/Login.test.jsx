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
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Login should render Login form component correctly', async () => {
    render(<Login />)

    expect(await screen.getByTestId('test-email')).toBeInTheDocument()
    expect(await screen.getByTestId('test-password')).toBeInTheDocument()
    expect(await screen.getByTestId('test-submit-button')).toBeInTheDocument()
  })

  test('User logs in with valid credentials', async () => {
    const mockAxios = jest.spyOn(axios, 'post')
    mockAxios.mockResolvedValueOnce({
      data: {
        success: 'You\'re logged in!'
      }
    })

    render(<Login />)
    const email = screen.getByTestId('test-email')
    const password = screen.getByTestId('test-password')
    const submit = screen.getByTestId('test-submit-button')

    await userEvent.type(email, 'test@test.com')
    await userEvent.type(password, 'test')
    await userEvent.click(submit)

    expect(screen.getByTestId('test-success-msg')).toBeInTheDocument()
    expect(mockAxios).toHaveBeenCalledTimes(1)
    expect(mockAxios).toHaveBeenCalledWith(
      '/api/login',
      {
        email: 'test@test.com',
        pwd: 'test'
      }
    )
  })

  test('User logs in with no credentials', async () => {
    const mockAxios = jest.spyOn(axios, 'post')
    mockAxios.mockResolvedValueOnce({
      data: {
        error: 'Invalid form'
      }
    })

    render(<Login />)
    const submit = screen.getByTestId('test-submit-button')

    await userEvent.click(submit)

    expect(screen.getByTestId('test-alert-msg')).toBeInTheDocument()
    expect(mockAxios).toHaveBeenCalledTimes(1)
    expect(mockAxios).toHaveBeenCalledWith(
      '/api/login',
      { email: '', pwd: '' }
    )
  })
})
