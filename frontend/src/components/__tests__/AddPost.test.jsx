import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import AddPost from '../AddPost'
import axios from 'axios'

describe('User interacts with the AddPost modal window', () => {
  beforeEach(() => {
    delete window.location
    window.location = { reload: jest.fn() }
  })

  test('User adds a new post and modal is no longer displayed', async () => {
    const typeTitleText = 'Typed text title'
    const typeContentText = '' // For now, this will be blank. See NOTE below for more details
    const mockToken = 'mock-auth-token'

    localStorage.setItem('token', mockToken)

    axios.post = jest.fn()
    axios.post.mockResolvedValueOnce({
      data: {
        success: true
      }
    })

    render(<AddPost />)
    const addPostBtn = screen.getByTestId('test-modal-add-post-button')
    await userEvent.click(addPostBtn)

    const modalTitleField = screen.getByTestId('test-modal-title-textfield')
    await userEvent.type(modalTitleField, typeTitleText)

    /*
     NOTE: The TinyMCE editor does not render since the jsdom environment is not supported
     This results in a bare textarea element with id="tinymce-editor and blank value attribute.
     The onEditorChange event does not trigger the handleEditorChange() component method.
     For now, the content text will be a blank string since we cannot pass the value through state.
    */
    // const modalTextArea = document.querySelector('#tinymce-editor')
    // await userEvent.type(modalTextArea, typeContentText)

    expect(await screen.getByTestId('test-modal-add-post')).toBeInTheDocument()
    expect(await screen.getByTestId('test-modal-add-post')).toHaveTextContent('Add Post')
    expect(await screen.getByTestId('test-modal-add-post')).toHaveStyle('display:none')
    expect(await screen.getByTestId('test-modal-add-post-form')).toBeInTheDocument()

    const modalPostBtn = screen.getByTestId('test-modal-form-add-post-button')
    await userEvent.click(modalPostBtn)

    expect(window.location.reload).toHaveBeenCalled()
    expect(axios.post).toBeCalledWith(
      '/api/add_post',
      {
        title: typeTitleText,
        content: typeContentText
      },
      {
        headers: {
          Authorization: `Bearer ${mockToken}`
        }
      }
    )
  })

  test('User submits a post and handles exception error', async () => {
    const typeTitleText = 'Typed text title'
    const mockToken = 'mock-auth-token'

    localStorage.setItem('token', mockToken)

    axios.post = jest.fn()
    axios.post.mockResolvedValueOnce({
      data: {
        error: 'HTTP 400: Some exception error'
      }
    })

    render(<AddPost />)
    const addPostBtn = screen.getByTestId('test-modal-add-post-button')
    await userEvent.click(addPostBtn)

    const modalTitleField = screen.getByTestId('test-modal-title-textfield')
    await userEvent.type(modalTitleField, typeTitleText)

    /*
     NOTE: The TinyMCE editor does not render since the jsdom environment is not supported
     This results in a bare textarea element with id="tinymce-editor and blank value attribute.
     The onEditorChange event does not trigger the handleEditorChange() component method.
     For now, the content text will be a blank string since we cannot pass the value through state.
    */
    // const modalTextArea = document.querySelector('#tinymce-editor')
    // await userEvent.type(modalTextArea, typeContentText)

    expect(await screen.getByTestId('test-modal-add-post')).toBeInTheDocument()
    expect(await screen.getByTestId('test-modal-add-post')).toHaveTextContent('Add Post')
    expect(await screen.getByTestId('test-modal-add-post')).toHaveStyle('display:none')
    expect(await screen.getByTestId('test-modal-add-post-form')).toBeInTheDocument()

    const modalPostBtn = screen.getByTestId('test-modal-form-add-post-button')
    await userEvent.click(modalPostBtn)

    expect(window.location.reload).not.toHaveBeenCalled()
  })
})
