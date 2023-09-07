import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'
import * as login from '../../utils/login'

test('App should render App fragment component correctly for Home page', async () => {
  render(<App />)

  expect(await screen.getByTestId('test-navbar')).toBeInTheDocument()

  const allLinks = await screen.getAllByRole('link')
  expect(allLinks[0]).toHaveAttribute('href', '/')
  expect(allLinks[1]).toHaveAttribute('href', '/login')
  expect(allLinks[2]).toHaveAttribute('href', '/register')

  // The Home page component is rendered
  expect(await screen.getByTestId('test-login-button')).toBeInTheDocument()
  expect(await screen.getByTestId('test-register-button')).toBeInTheDocument()
  expect(await screen.getByTestId('test-post')).toBeInTheDocument()
})

test('App should render App fragment component correctly for Main page', async () => {
  const mockCheckToken = jest.spyOn(login, 'checkToken')
  mockCheckToken.mockResolvedValueOnce(true)
  render(<App />)

  expect(await screen.getByTestId('test-navbar')).toBeInTheDocument()

  const allLinks = await screen.getAllByRole('link')
  expect(allLinks[0]).toHaveAttribute('href', '/')
  expect(allLinks[1]).toHaveAttribute('href', '/login')
  expect(allLinks[2]).toHaveAttribute('href', '/register')

  // The Main page component is rendered
  expect(await screen.getByTestId('test-main-posts')).toBeInTheDocument()
  expect(await screen.getByTestId('test-posts-list')).toBeInTheDocument()
})
