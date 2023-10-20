// src/componenets/MainPage.jsx
import React from 'react'
import AddPost from './AddPost'
import PostItem from './PostItem'
import axios from 'axios'

class MainPage extends React.Component {
  state = {
    posts: [],
    currentUser: { username: '' }
  }

  componentDidMount () {
    axios.get('/api/posts').then(response => {
      this.setState({ posts: response.data[0].reverse() })
    })

    setTimeout(() => {
      axios.get('/api/get_current_user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then(response => {
        this.setState({ currentUser: response.data[0] })
      })
    }, 500)
  }

  render () {
    return (
      <React.Fragment>
        <div
          data-testid="test-main-posts"
          className="w3-container w3-jumbo"
          style={{ margin: '3rem', paddingLeft: '1rem' }}>
          <h1>Posts</h1>
          <button
            className="w3-button w3-blue w3-large"
            data-testid="test-add-post-button"
            onClick= { () => {
              document.getElementById('addPost').style.display = 'block'
            }
          }>Add Post</button>
        </div>
        <AddPost />
        <div className="w3-container" data-testid="test-posts-list">
          { this.state.posts.length === 0
            ? <p className="w3-xlarge w3-opacity" style={{ marginLeft: '2rem' }}> No posts! Create one</p>
            : this.state.posts.map((item, index) => {
              return (
                <PostItem
                  id={ item.id }
                  title={ item.title }
                  content={ item.content }
                  author={ item.user.username}
                  isOwner={ this.state.currentUser.username === item.user.username }
                  key={ index }
                />
              )
            }
            )}
        </div>
      </React.Fragment>
    )
  }
}

export default MainPage
