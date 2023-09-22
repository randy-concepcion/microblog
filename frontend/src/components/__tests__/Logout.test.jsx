import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Logout from '../Logout'

test('Logout should render Logout form component correctly', async () => {
  render(<Logout />)

  expect(await screen.getByTestId('test-logout-message')).toBeInTheDocument()
})
