import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PostItem from '../PostItem'

test('PostItem displays Delete button if owner is logged in', async () => {
  const postTitle = 'This is the post title'
  const postContent = 'This contains the content of the post'

  const props = {
    id: 1,
    title: postTitle,
    content: postContent,
    user: {
      username: 'owner'
    },
    isOwner: true
  }

  render(<PostItem { ...props } />)

  expect(await screen.getByTestId('test-post-title')).toHaveTextContent(postTitle)
  expect(await screen.getByTestId('test-post-content')).toHaveTextContent(postContent)
  expect(await screen.getByTestId('test-delete-button')).toBeInTheDocument()
  expect(await screen.getByTestId('test-like-button')).toBeInTheDocument()
  expect(await screen.getByTestId('test-repost-button')).toBeInTheDocument()
  expect(await screen.getByTestId('test-reply-button')).toBeInTheDocument()
})

test('PostItem displays Delete button if user is not owner of post', async () => {
  const postTitle = 'This is the post title'
  const postContent = 'This contains the content of the post'

  const props = {
    id: 1,
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
