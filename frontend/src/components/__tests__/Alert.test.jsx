import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Alert from '../Alert'

test('Alert should render Alert form component correctly', async () => {
  const errorMsg = 'error message'
  render(<Alert message={errorMsg}/>)

  expect(await screen.getByTestId('test-alert-msg')).toBeInTheDocument()
  expect(await screen.getByTestId('test-alert-msg')).toHaveTextContent(errorMsg)
})
