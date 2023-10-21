import { act, render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import MainPage from '../MainPage'

describe('User interacts with MainPage component to display content', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  test('When user does not see any posts displayed', async () => {
    const username = 'owner'

    axios.get = jest.fn()
    axios.get.mockResolvedValueOnce({
      data: [
        []
      ]
    }).mockResolvedValueOnce({
      data: [
        {
          username
        },
        200,
        { 'Content-Type': 'application/json' }
      ]
    })

    await act(async () => { render(<MainPage />) })

    await waitFor(async () => {
      expect(await screen.getByTestId('test-main-posts')).toBeInTheDocument()
      expect(await screen.getByTestId('test-posts-list')).toBeInTheDocument()
      expect(await screen.getByTestId('test-add-post-button')).toBeInTheDocument()
      expect(await screen.getByText('No posts! Create one')).toBeInTheDocument()
    })
  })

  test('Modal is displayed when user clicks on Add Post button', async () => {
    const testTitle = 'Test post title'
    const testContent = 'Test post content'
    const username = 'owner'

    const user = userEvent.setup({ delay: null })
    axios.get = jest.fn()
    axios.get.mockResolvedValueOnce({
      data: [
        [
          {
            id: 1,
            title: testTitle,
            content: testContent,
            user: {
              username
            }
          }
        ],
        200,
        {
          'Content-Type': 'application/json'
        }
      ]
    }).mockResolvedValueOnce({
      data: [
        {
          username
        },
        200,
        { 'Content-Type': 'application/json' }
      ]
    })

    await act(async () => render(<MainPage />))
    await act(async () => jest.runAllTimers())
    const addPostBtn = screen.getByTestId('test-add-post-button')

    await act(async () => user.click(addPostBtn))

    // Modal content
    expect(await screen.getByTestId('test-modal-add-post')).toBeInTheDocument()
    expect(await screen.getByTestId('test-modal-form-add-post-button')).toBeInTheDocument()
    expect(await screen.getByTestId('test-modal-add-post-form')).toBeInTheDocument()
  })

  test('When user sees content from their posts displayed', async () => {
    const testTitle = 'Test post title'
    const testContent = 'Test post content'
    const username = 'owner'

    axios.get = jest.fn()
    axios.get.mockResolvedValueOnce({
      data: [
        [
          {
            id: 1,
            title: testTitle,
            content: testContent,
            user: {
              username
            }
          }
        ],
        200,
        {
          'Content-Type': 'application/json'
        }
      ]
    }).mockResolvedValueOnce({
      data: [
        {
          username
        },
        200,
        { 'Content-Type': 'application/json' }
      ]
    })

    await act(async () => render(<MainPage />))

    await waitFor(async () => {
      expect(await screen.getByTestId('test-main-posts')).toBeInTheDocument()
      expect(await screen.getByTestId('test-posts-list')).toBeInTheDocument()
      expect(await screen.getByText(testTitle)).toBeInTheDocument()
      expect(await screen.getByText(testContent)).toBeInTheDocument()
    })
  })
})
