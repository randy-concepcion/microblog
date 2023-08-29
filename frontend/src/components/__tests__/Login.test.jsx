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

test('Login should render Login form component correctly', async () => {
  render(<Login />)

  expect(await screen.getByTestId('test-email')).toBeInTheDocument()
  expect(await screen.getByTestId('test-password')).toBeInTheDocument()
  expect(await screen.getByTestId('test-submit-button')).toBeInTheDocument()
})

test('User logs in with valid credentials', async () => {
  const mockAxios = jest.spyOn(axios, 'post')
  mockAxios.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ success: true })
  })

  render(<Login />)
  const email = screen.getByTestId('test-email')
  const password = screen.getByTestId('test-password')
  const submit = screen.getByTestId('test-submit-button')

  await userEvent.type(email, 'test@test.com')
  await userEvent.type(password, 'test')
  await userEvent.click(submit)

  expect(mockAxios).toHaveBeenCalledTimes(1)
  expect(mockAxios).toHaveBeenCalledWith(
    'http://localhost:5000/api/login',
    {
      email: 'test@test.com',
      pwd: 'test'
    }
  )
})
