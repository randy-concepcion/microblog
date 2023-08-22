import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from './Login'

test('Login should render Login form component correctly', async () => {
  render(<Login />)

  expect(await screen.getByTestId('test-email')).toBeInTheDocument()
  expect(await screen.getByTestId('test-password')).toBeInTheDocument()
  expect(await screen.getByTestId('test-submit-button')).toBeInTheDocument()
})
