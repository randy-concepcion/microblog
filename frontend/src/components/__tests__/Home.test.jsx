import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../Home'

test('Home should render Home fragment component correctly', async () => {
  render(<Home />)

  expect(await screen.getByTestId('test-login-button')).toBeInTheDocument()
  expect(await screen.getByTestId('test-register-button')).toBeInTheDocument()
  expect(await screen.getByTestId('test-post')).toBeInTheDocument()
})
