import { act, render, screen } from '@testing-library/react'
import axios from 'axios'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import MainPage from '../MainPage'

describe('User interacts with MainPage component to display content', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('When user does not see any posts displayed', async () => {
    const mockAxios = jest.spyOn(axios, 'get')
    mockAxios.mockResolvedValueOnce({
      data: []
    })

    await act(async () => render(<MainPage />))

    expect(await screen.getByTestId('test-main-posts')).toBeInTheDocument()
    expect(await screen.getByTestId('test-posts-list')).toBeInTheDocument()
    expect(await screen.getByTestId('test-add-post-button')).toBeInTheDocument()
    expect(await screen.getByText('No posts! Create one')).toBeInTheDocument()
  })

  test('Modal is displayed when user clicks on Add Post button', async () => {
    const mockAxios = jest.spyOn(axios, 'get')
    mockAxios.mockResolvedValueOnce({
      data: []
    })

    await act(async () => render(<MainPage />))
    const addPostBtn = screen.getByTestId('test-add-post-button')

    await userEvent.click(addPostBtn)

    // Modal content
    expect(await screen.getByTestId('test-modal-add-post')).toBeInTheDocument()
    expect(await screen.getByTestId('test-modal-add-post-button')).toBeInTheDocument()
    expect(await screen.getByTestId('test-modal-add-post-form')).toBeInTheDocument()
  })

  test('When user sees content from posts displayed', async () => {
    const testTitle = 'Test post title'
    const testContent = 'Test post content'
    const mockAxios = jest.spyOn(axios, 'get')
    mockAxios.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          title: testTitle,
          content: testContent,
          user: 1
        }
      ]
    })

    await act(async () => render(<MainPage />))

    expect(await screen.getByTestId('test-main-posts')).toBeInTheDocument()
    expect(await screen.getByTestId('test-posts-list')).toBeInTheDocument()
    expect(await screen.getByText(testTitle)).toBeInTheDocument()
    expect(await screen.getByText(testContent)).toBeInTheDocument()
  })
})
