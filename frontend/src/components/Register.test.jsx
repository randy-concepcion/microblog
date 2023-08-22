import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Register from './Register'

test('Register form should render Register form component correctly', async () => {
  render(<Register />)

  expect(await screen.getByTestId('test-email')).toBeInTheDocument()
  expect(await screen.getByTestId('test-username')).toBeInTheDocument()
  expect(await screen.getByTestId('test-password')).toBeInTheDocument()
  expect(await screen.getByTestId('test-submit-button')).toBeInTheDocument()
})
