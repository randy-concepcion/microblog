import { render, screen } from '@testing-library/react'
import axios from 'axios'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Register from '../Register'

// TODO: We may want to consider using 'msw' to avoid mocking
//       specifically axios and use a mock server instead
//       which allows for refactoring the implementation
//       without changing these tests
//       References:
//       - https://kentcdodds.com/blog/stop-mocking-fetch#then-i-discovered-msw
//       - https://stackoverflow.com/questions/67101502/how-to-mock-axios-with-jest

describe('User interacts with Register component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Register form should render Register form component correctly', async () => {
    render(<Register />)

    expect(await screen.getByTestId('test-email')).toBeInTheDocument()
    expect(await screen.getByTestId('test-username')).toBeInTheDocument()
    expect(await screen.getByTestId('test-password')).toBeInTheDocument()
    expect(await screen.getByTestId('test-submit-button')).toBeInTheDocument()
  })

  test('User registers with valid credentials', async () => {
    const mockAxios = jest.spyOn(axios, 'post')
    mockAxios.mockResolvedValueOnce({
      success: true
    })

    render(<Register />)
    const email = screen.getByTestId('test-email')
    const username = screen.getByTestId('test-username')
    const password = screen.getByTestId('test-password')
    const submit = screen.getByTestId('test-submit-button')

    await userEvent.type(email, 'test@test.com')
    await userEvent.type(username, 'tester')
    await userEvent.type(password, 'test')
    await userEvent.click(submit)

    expect(screen.getByTestId('test-success-msg')).toBeInTheDocument()
    expect(mockAxios).toHaveBeenCalledTimes(1)
    expect(mockAxios).toHaveBeenCalledWith(
      '/api/register',
      {
        email: 'test@test.com',
        pwd: 'test',
        username: 'tester'
      }
    )
  })

  test('User registers with no credentials', async () => {
    const mockAxios = jest.spyOn(axios, 'post')
    mockAxios.mockRejectedValueOnce({
      response: {
        data: {
          error: 'Check your form and try again!'
        }
      }
    })

    render(<Register />)
    const submit = screen.getByTestId('test-submit-button')

    await userEvent.click(submit)

    expect(screen.getByTestId('test-alert-msg')).toBeInTheDocument()
    expect(mockAxios).toHaveBeenCalledTimes(1)
    expect(mockAxios).toHaveBeenCalledWith(
      '/api/register',
      { email: '', pwd: '', username: '' }
    )
  })
})
