import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import axios from 'axios'
import PostItem from '../PostItem'

test('User clicks on delete button to delete their post', async () => {
  delete window.location
  window.location = { reload: jest.fn() }

  const postTitle = 'This is the post title'
  const postContent = 'This contains the content of the post'
  const mockToken = 'mock-auth-token'
  const mockPostId = '1'

  localStorage.setItem('token', mockToken)

  axios.delete = jest.fn()
  axios.delete.mockResolvedValueOnce({
    data: [
      {
        success: true
      },
      200,
      { 'Content-Type': 'application/json' }
    ]
  })

  const props = {
    id: mockPostId,
    title: postTitle,
    content: postContent,
    user: {
      username: 'owner'
    },
    isOwner: true
  }

  render(<PostItem { ...props } />)

  // Assert that the user's post is displayed
  expect(await screen.getByTestId('test-post-title')).toHaveTextContent(postTitle)
  expect(await screen.getByTestId('test-post-content')).toHaveTextContent(postContent)
  expect(await screen.getByTestId('test-delete-button')).toBeInTheDocument()
  expect(await screen.getByTestId('test-like-button')).toBeInTheDocument()
  expect(await screen.getByTestId('test-repost-button')).toBeInTheDocument()
  expect(await screen.getByTestId('test-reply-button')).toBeInTheDocument()

  const deleteButton = await screen.getByTestId('test-delete-button')
  await userEvent.click(deleteButton)

  // Assert that the post is deleted
  expect(window.location.reload).toHaveBeenCalled()
  expect(axios.delete).toBeCalledWith(
      `/api/delete_post/${mockPostId}`,
      {
        headers: {
          Authorization: `Bearer ${mockToken}`
        }
      }
  )
})

test('PostItem displays Delete button if user is not owner of post', async () => {
  const postTitle = 'This is the post title'
  const postContent = 'This contains the content of the post'

  const props = {
    id: '1',
    title: postTitle,
    content: postContent,
    user: {
      username: 'notowner'
    },
    isOwner: false
  }

  const { container } = render(<PostItem { ...props } />)

  const noDeleteButton = container.querySelector('[data-testid="test-delete-button"]')

  expect(await screen.getByTestId('test-post-title')).toHaveTextContent(postTitle)
  expect(await screen.getByTestId('test-post-content')).toHaveTextContent(postContent)
  expect(noDeleteButton).not.toBeInTheDocument()
  expect(await screen.getByTestId('test-like-button')).toBeInTheDocument()
  expect(await screen.getByTestId('test-repost-button')).toBeInTheDocument()
  expect(await screen.getByTestId('test-reply-button')).toBeInTheDocument()
})
