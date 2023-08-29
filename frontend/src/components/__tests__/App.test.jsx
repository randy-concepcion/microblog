import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

test('App should render App fragment component correctly', async () => {
  render(<App />)

  expect(await screen.getByTestId('test-navbar')).toBeInTheDocument()

  const allLinks = await screen.getAllByRole('link')
  expect(allLinks[0]).toHaveAttribute('href', '/')
  expect(allLinks[1]).toHaveAttribute('href', '/login')
  expect(allLinks[2]).toHaveAttribute('href', '/register')
})
