import { render, screen } from '@testing-library/react'
import axios from 'axios'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import UserSettings from '../UserSettings'

describe('UserSettings: no token is stored in localStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    delete window.location
  })

  test('User returns to login page', () => {
    render(<UserSettings />)
    expect(window.location).toBe('/login')
  })
})

describe('UserSettings: User attempts to change password', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    delete window.location
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
        success: true
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

  test('User clicks back button to return to main page', async () => {
    const mockToken = 'mock-auth-token'

    localStorage.setItem('token', mockToken)

    render(<UserSettings />)
    const changePassword = screen.getByTestId('test-change-password')
    await userEvent.click(changePassword)

    const backBtn = screen.getByTestId('test-back-button')
    await userEvent.click(backBtn)

    expect(await screen.getByTestId('test-change-password')).toBeInTheDocument()
    expect(await screen.getByTestId('test-delete-account')).toBeInTheDocument()
  })
})

describe('UserSettings: User attempts to delete account', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    delete window.location
    delete window.alert
    delete window.confirm
  })

  test('User encounters an error when deleting account', async () => {
    const mockToken = 'mock-auth-token'

    localStorage.setItem('token', mockToken)

    axios.delete = jest.fn()
    axios.delete.mockResolvedValueOnce({
      data: {
        error: 'Error: Unable to delete account'
      }
    })

    window.alert = jest.fn()
    window.confirm = jest.fn(() => true)

    render(<UserSettings />)
    const deleteAccount = screen.getByTestId('test-delete-account')
    await userEvent.click(deleteAccount)

    const deleteAccountBtn = screen.getByTestId('test-delete-account-button')
    await userEvent.click(deleteAccountBtn)

    expect(window.alert).toHaveBeenCalled()
  })

  test('User successfully deletes account', async () => {
    const mockToken = 'mock-auth-token'

    localStorage.setItem('token', mockToken)

    axios.delete = jest.fn()
    axios.delete.mockResolvedValueOnce({
      data: {
        success: true
      }
    })

    window.alert = jest.fn()
    window.confirm = jest.fn(() => true)

    render(<UserSettings />)
    const deleteAccount = screen.getByTestId('test-delete-account')
    await userEvent.click(deleteAccount)

    const deleteAccountBtn = screen.getByTestId('test-delete-account-button')
    await userEvent.click(deleteAccountBtn)

    expect(window.location).toBe('/logout')
  })

  test('User clicks back button to return to main page', async () => {
    const mockToken = 'mock-auth-token'

    localStorage.setItem('token', mockToken)

    render(<UserSettings />)
    const deleteAccount = screen.getByTestId('test-delete-account')
    await userEvent.click(deleteAccount)

    const backBtn = screen.getByTestId('test-back-button')
    await userEvent.click(backBtn)

    expect(await screen.getByTestId('test-change-password')).toBeInTheDocument()
    expect(await screen.getByTestId('test-delete-account')).toBeInTheDocument()
  })

  test('User cancels deleting account', async () => {
    const mockToken = 'mock-auth-token'

    localStorage.setItem('token', mockToken)

    axios.delete = jest.fn()

    window.confirm = jest.fn(() => false)

    render(<UserSettings />)
    const deleteAccount = screen.getByTestId('test-delete-account')
    await userEvent.click(deleteAccount)

    const deleteAccountBtn = screen.getByTestId('test-delete-account-button')
    await userEvent.click(deleteAccountBtn)

    expect(axios.delete).not.toHaveBeenCalled()
  })
})
