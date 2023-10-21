// src/components/AddPost.jsx
import axios from 'axios'
import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import Alert from './Alert'

class AddPost extends React.Component {
  state = {
    content: '<p>Please edit your post</p>',
    titleError: '',
    contentError: '',
    formError: ''
  }

  // NOTE: This line is ignored for tests since TinyMCE does not get rendered to trigger this method
  /* istanbul ignore next */
  handleEditorChange = (content, editor) => {
    this.setState({ content })
  }

  submitForm = (e) => {
    e.preventDefault()

    if (this.state.content.length === 0) {
      this.setState({
        contentError: 'Please enter a message to post'
      })

      return
    }

    if (document.getElementById('title').value.length === 0) {
      this.setState({
        titleError: 'Please enter a title'
      })

      return
    }

    axios.post('/api/add_post', {
      title: document.getElementById('title').value,
      content: this.state.content
    },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => {
      console.log(response.data.success)
      if (response.data.success) {
        window.location.reload()
      } else {
        this.setState({
          formError: response.data.error
        })
      }
    })
  }

  render () {
    return (
      <div className="w3-modal w3-animate-opacity" id="addPost" data-testid="test-modal-add-post">
        <div className="w3-modal-content w3-card">
          <header className="w3-container w3-blue">
            <span className="w3-button w3-display-topright w3-hover-none w3-hover-text-white" data-testid="test-modal-add-post-button" onClick={ () => {
              document.getElementById('addPost').style.display = 'none'
            }}>X</span>
            <h2>Add Post</h2>
          </header>
          <form className="w3-container" data-testid="test-modal-add-post-form" onSubmit={this.submitForm}>
            {
              this.state.formError.length > 0 &&
              <Alert message = { this.state.formError } />
            }
            <div className="w3-section">
              <p>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" className="w3-input w3-border w3-margin-bottom" data-testid="test-modal-title-textfield" />
                <small className="w3-text-gray">{ this.state.titleError }</small>
              </p>
              <p>
                <Editor
                  id="tinymce-editor"
                  value={ this.state.content }
                  onEditorChange={ this.handleEditorChange }
                  initalValue="<p>Enter text to post</p>"
                  tinymceScriptSrc="../../node_modules/tinymce/tinymce.min.js"
                  init={
                    {
                      height: 300,
                      menubar: false,
                      statusbar: false,
                      toolbar_mode: 'sliding',
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'media', 'emoticons', 'preview', 'anchor',
                        'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'help', 'wordcount'
                      ],
                      toolbar:
                        `undo redo | formatselect | bold italic underline strikethrough | image anchor media |
                        alignleft aligncenter alignright alignjustify |
                        outdent indent | bulllist numlist | fullscreen preview | emoticons help`,
                      contextmenu: 'bold italic underline indent outdent help'
                    }
                  }
                />
                <small className="w3-text-gray">{ this.state.contentError }</small>
              </p>
              <p>
                <button type="submit" className="w3-button w3-blue" data-testid="test-modal-form-add-post-button">Post</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default AddPost
