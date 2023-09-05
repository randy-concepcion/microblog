import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PostItem from '../PostItem'

test('PostItem should render PostItem content component correctly', async () => {
  const postTitle = 'This is the post title'
  const postContent = 'This contains the content of the post'
  const props = { title: postTitle, content: postContent }
  render(<PostItem { ...props } />)

  expect(await screen.getByTestId('test-post-title')).toHaveTextContent(postTitle)
  expect(await screen.getByTestId('test-post-content')).toHaveTextContent(postContent)
  expect(await screen.getByTestId('test-like-button')).toBeInTheDocument()
  expect(await screen.getByTestId('test-repost-button')).toBeInTheDocument()
  expect(await screen.getByTestId('test-reply-button')).toBeInTheDocument()
})
