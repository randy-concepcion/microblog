import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MainPage from '../MainPage'

test('MainPage should render MainPage fragment component correctly', async () => {
  render(<MainPage />)

  expect(await screen.getByTestId('test-main-posts')).toBeInTheDocument()
  expect(await screen.getByTestId('test-posts-list')).toBeInTheDocument()
})
