// src/components/PostItem.jsx
import PropTypes from 'prop-types'

function PostItem (props) {
  return (
    <div
      className="w3-card w3-border w3-border-gray w3-round-large"
      style={{ marginTop: '2rem' }}>
      <div
        className="w3-container"
        style={{ padding: '2rem' }}>
        <h2 className="w3-opacity w3-xxlarge" data-testid="test-post-title">{props.title}</h2>
        <div data-testid="test-post-content" dangerouslySetInnerHTML={{ __html: props.content }}></div>
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
  title: PropTypes.string,
  content: PropTypes.string
}

export default PostItem