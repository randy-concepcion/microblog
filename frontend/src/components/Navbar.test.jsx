import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from './Navbar'

test('Navbar should render Navbar component correctly', async () => {
  render(<Navbar />)

  const element = await screen.getByTestId('test-navbar')
  expect(element).toBeInTheDocument()
})
