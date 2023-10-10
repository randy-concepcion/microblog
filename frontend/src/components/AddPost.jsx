// src/components/AddPost.jsx
import { Editor } from '@tinymce/tinymce-react'

function AddPost () {
  return (
    <div className="w3-modal w3-animate-opacity" id="addPost" data-testid="test-modal-add-post">
      <div className="w3-modal-content w3-card">
        <header className="w3-container w3-blue">
          <span className="w3-button w3-display-topright w3-hover-none w3-hover-text-white" data-testid="test-modal-add-post-button" onClick={ () => {
            document.getElementById('addPost').style.display = 'none'
          }}>X</span>
          <h2>Add Post</h2>
        </header>
        <form className="w3-container" data-testid="test-modal-add-post-form">
          <div className="w3-section">
            <p>
              <label htmlFor="title">Title</label>
              <input type="text" id="title" className="w3-input w3-border w3-margin-bottom" />
            </p>
            <Editor
              data-testid="test-modal-editor-text-area"
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
            <p>
              <button type="submit" className="w3-button w3-blue" data-testid="test-modal-form-add-post-button">Post</button>
            </p>
          </div>
        </form>
      </div>
    </div>)
}

export default AddPost
