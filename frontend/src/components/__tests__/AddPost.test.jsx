import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddPost from '../AddPost'

test('AddPost should render AddPost form component correctly', async () => {
  render(<AddPost />)

  expect(await screen.getByTestId('test-add-post')).toBeInTheDocument()
  expect(await screen.getByTestId('test-add-post')).toHaveTextContent('Add Post')
  expect(await screen.getByTestId('test-add-post-form')).toBeInTheDocument()
})
