import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import AddPost from '../AddPost'

test('AddPost should render AddPost form component where display block is none after being clicked', async () => {
  render(<AddPost />)
  const addPostButton = screen.getByTestId('test-modal-add-post-button')
  await userEvent.click(addPostButton)

  expect(await screen.getByTestId('test-modal-add-post')).toBeInTheDocument()
  expect(await screen.getByTestId('test-modal-add-post')).toHaveTextContent('Add Post')
  expect(await screen.getByTestId('test-modal-add-post')).toHaveStyle('display:none')
  expect(await screen.getByTestId('test-modal-add-post-form')).toBeInTheDocument()
})
