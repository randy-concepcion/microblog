// src/componenets/MainPage.jsx
import React from 'react'
import AddPost from './AddPost'
import PostItem from './PostItem'
import axios from 'axios'

class MainPage extends React.Component {
  state = { posts: [] }

  componentDidMount () {
    axios.get('/api/posts').then(response => {
      this.setState({ posts: response.data })
    })
  }

  render () {
    return (
      <React.Fragment>
        <div
          data-testid="test-main-posts"
          className="w3-container w3-jumbo"
          style={{ margin: '3rem', paddingLeft: '1rem' }}>
          <h1>Posts</h1>
          <button className="w3-button w3-blue w3-large" onClick= { () => {
            document.getElementById('addPost').style.display = 'block'
          }}>Add Post</button>
        </div>
        <AddPost />
        <div className="w3-container" data-testid="test-posts-list">
          { this.state.posts.length === 0
            ? <p className="w3-xlarge 23-opacity" style={{ marginLeft: '2rem' }}> No posts! Create one</p>
            : this.state.posts.map((item, index) => {
              return (
                <PostItem
                  title={ item.title }
                  content={ item.content }
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
