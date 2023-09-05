// src/componenets/MainPage.jsx
import React from 'react'
import PostItem from './PostItem'

class MainPage extends React.Component {
  render () {
    const postItems = [
      {
        title: 'Hello, world!',
        content: '<h3>Just gonna type html here!</h3>'
      },
      {
        title: 'Code post',
        content: '<code>Look at my code!</code>'
      },
      {
        title: 'Nice!',
        content: "<a href='https://www.google.com'>Here's a link to Google!</a>"
      },
      {
        title: 'More Hello, world!',
        content: '<div>Typing <strong>using</strong> <em>more</em> <u>than</u> <sup>one</sup> <sub>html</sub> <del>tag</del>!</div>'
      }
    ]

    return (
      <React.Fragment>
        <div
          data-testid="test-main-posts"
          className="w3-container w3-jumbo"
          style={{ margin: '3rem', paddingLeft: '1rem' }}>
          Posts
        </div>
        <div className="w3-container" data-testid="test-posts-list">
          { postItems.map((item, index) => {
            return (
                <PostItem
                  title={ item.title }
                  content={ item.content }
                  key={ index }
                />
            )
          })
          }
        </div>
      </React.Fragment>
    )
  }
}

export default MainPage
