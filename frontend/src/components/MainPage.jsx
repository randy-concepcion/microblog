// src/componenets/MainPage.jsx
import React from 'react'

class MainPage extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div
          data-testid="test-main-posts"
          className="w3-container w3-jumbo"
          style={{ margin: '3rem', paddingLeft: '1rem' }}>
          Tweets
        </div>
      </React.Fragment>
    )
  }
}

export default MainPage
