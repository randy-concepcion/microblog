import React from 'react'
import { logout } from '../utils/login'

class Logout extends React.Component {
  componentDidMount () {
    logout()
  }

  render () {
    return (
      <div
        className="w3-container w3-xlarge"
        data-testid="test-logout-message">
        <p>Please wait, logging you out...</p>
      </div>
    )
  }
}

export default Logout
