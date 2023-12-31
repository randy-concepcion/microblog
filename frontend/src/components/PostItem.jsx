// src/components/PostItem.jsx
import axios from 'axios'
import PropTypes from 'prop-types'

function deletePost (postId) {
  axios.delete('/api/delete_post/' + postId, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }).then(response => {
    console.log(response.data)
    window.location.reload()
  })
}

function PostItem (props) {
  return (
    <div
      className="w3-card w3-border w3-border-gray w3-round-large"
      style={{ marginTop: '2rem' }}>
      <header className="w3-container w3-opacity w3-light-gray" style={{ padding: '1rem' }}>@{props.author}</header>
      <div
        className="w3-container"
        style={{ padding: '2rem' }}>
          <h2 className="w3-xxlarge">
            <span className="w3-opacity" data-testid="test-post-title">{props.title}</span>
            { props.isOwner &&
              <button
                className="w3-right w3-button w3-red w3-large w3-hover-pale-red w3-round-large"
                onClick={ () => deletePost(props.id) }
                data-testid="test-delete-button"
              >
                Delete
              </button>
            }
          </h2>
        <div data-testid="test-post-content" dangerouslySetInnerHTML={{ __html: props.content }} />
      </div>
      <footer className="w3-container w3-center w3-large">
        <button className="w3-button" data-testid="test-like-button" style={{ marginRight: '2rem' }}>
          Like
        </button>
        <button className="w3-button" data-testid="test-repost-button" style={{ marginRight: '2rem' }}>
          Repost
        </button>
        <button className="w3-button" data-testid="test-reply-button">Reply</button>
      </footer>
    </div>
  )
}

PostItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  author: PropTypes.string,
  isOwner: PropTypes.bool
}

export default PostItem
