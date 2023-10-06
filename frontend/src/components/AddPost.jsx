// src/components/AddPost.jsx

function AddPost () {
  return (
    <div className="w3-modal w3-animate-opacity" id="addPost" data-testid="test-add-post">
      <div className="w3-modal-content w3-card">
        <header className="w3-container w3-blue">
          <span className="w3-button w3-display-topright w3-hover-none w3-hover-text-white" data-testid="test-add-post-button" onClick={ () => {
            document.getElementById('addPost').style.display = 'none'
          }}>X</span>
          <h2>Add Post</h2>
        </header>
        <form className="w3-container" data-testid="test-add-post-form">
          <div className="w3-section">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" className="w3-input w3-border w3-margin-bottom" />
            <textarea cols="30" rows="10" />
          </div>
        </form>
      </div>
    </div>)
}

export default AddPost