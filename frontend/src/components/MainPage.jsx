// src/componenets/MainPage.jsx
import React from 'react'
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
          Posts
        </div>
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
