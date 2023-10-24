import { render, screen } from '@testing-library/react'
import axios from 'axios'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import UserSettings from '../UserSettings'

describe('UserSettings: User attempts to change password', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    delete window.location
  })

  test('User returns to login page when no token is stored', () => {
    render(<UserSettings />)
    expect(window.location).toBe('/login')
  })

  test('User encounters an error when changing password', async () => {
    const mockToken = 'mock-auth-token'

    localStorage.setItem('token', mockToken)

    axios.post = jest.fn()
    axios.post.mockResolvedValueOnce({
      data: {
        error: 'Error: Unable to change password'
      }
    })

    render(<UserSettings />)
    const changePassword = screen.getByTestId('test-change-password')
    await userEvent.click(changePassword)

    const submitButton = screen.getByTestId('test-submit-button')
    await userEvent.click(submitButton)

    expect(await screen.getByTestId('test-alert-msg')).toBeInTheDocument()
  })

  test('User successfully changes password', async () => {
    const mockToken = 'mock-auth-token'

    localStorage.setItem('token', mockToken)

    axios.post = jest.fn()
    axios.post.mockResolvedValueOnce({
      data: {
        success: 'true'
      }
    })

    window.alert = jest.fn()

    render(<UserSettings />)
    const changePassword = screen.getByTestId('test-change-password')
    await userEvent.click(changePassword)

    const oldPassword = screen.getByTestId('test-old-password')
    await userEvent.type(oldPassword, 'old password')

    const newPassword = screen.getByTestId('test-new-password')
    await userEvent.type(newPassword, 'new password')

    const submitButton = screen.getByTestId('test-submit-button')
    await userEvent.click(submitButton)

    expect(window.location).toBe('/logout')
  })
})
