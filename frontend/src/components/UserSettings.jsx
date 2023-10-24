// src/components/UserSettings.jsx
import React from 'react'
import Alert from './Alert'
import axios from 'axios'

class UserSettings extends React.Component {
  state = {
    currentSetting: 'main', // values: main, cpwd, del
    error: ''
  }

  componentDidMount () {
    if (!localStorage.getItem('token')) {
      window.location = '/login'
    }
  }

  changePassword = (e) => {
    e.preventDefault()

    axios.post('/api/change_password',
      {
        password: document.getElementById('password').value,
        newPassword: document.getElementById('new-password').value
      },
      {
        headers: {
          Authorization: 'Bearer: ' + localStorage.getItem('token')
        }
      }
    ).then(response => {
      if (response.data.error) {
        this.setState({ error: response.data.error })
      } else {
        alert('Password changed! Logging you out...')
        window.location = '/logout'
      }
    })
  }

  deleteAccount = (e) => {
    e.preventDefault()

    const promptChoice = window.confirm('Are you sure you want to delete your account? THIS CANNOT BE UNDONE. ALL OF YOUR POSTS WILL BE DELETED.')

    if (promptChoice) {
      axios.delete('/api/delete_account',
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      ).then(response => {
        if (response.data.error) {
          alert('An error occurred: ' + response.data.error)
        } else {
          alert('Your account has been deleted. Returning to the home page...')
          window.location = '/logout'
        }
      })
    }
  }

  render () {
    return (
      <div className="w3-container" style={{ margin: '3rem' }}>
        <div className="w3-card w3-border w3-round-large">
          <header
            className="w3-container w3-xlarge w3-blue"
            style={{ padding: '0.5rem', paddingLeft: '3rem' }}
          >
          Settings
          </header>
          <div className="w3-container">
            { this.state.error.length > 0 && <Alert message={ this.state.error } /> }
            { this.state.currentSetting === 'main' &&
              <div style={{ margin: '1rem' }}>
                <h1 className="w3-xxlarge">Settings</h1>
                <hr className="w3-border-top w3-border-black" />
                <p>Choose a setting from below:</p>
                <ul className="w3-ul w3-border w3-hoverable">
                  <li
                    onClick={ () => this.setState({ currentSetting: 'cpwd' }) }
                    style={{ cursor: 'pointer' }}
                    className="w3-hover-light-gray"
                    data-testid='test-change-password'
                  >
                  Change password
                  </li>
                  <li
                    onClick={ () => this.setState({ currentSetting: 'del' }) }
                    style={{ cursor: 'pointer' }}
                    className="w3-text-red w3-hover-pale-red w3-hover-text-red"
                  >
                  Delete account
                  </li>
                </ul>
              </div>
            }
            {
              this.state.currentSetting === 'cpwd' &&
              <div style={{ margin: '1rem' }}>
                <h1 className="w3-xxlarge">Change password</h1>
                <hr className="w3-border-top w3-border-black" />
                <button
                  data-testid='test-back-button'
                  className="w3-button w3-blue"
                  onClick={ () => this.setState({ currentSetting: 'main' }) }
                >
                &laquo; Back
                </button>
                <form onSubmit={ this.changePassword }>
                  <p>
                    <label htmlFor="password">Old password</label>
                    <input
                      type="password"
                      id="password"
                      className="w3-input w3-border"
                      data-testid="test-old-password"
                    />
                  </p>
                  <p>
                    <label htmlFor="npassword">New password</label>
                    <input
                      type="password"
                      id="npassword"
                      className="w3-input w3-border"
                      data-testid="test-new-password"
                    />
                  </p>
                  <p>
                    <button
                      type="submit"
                      className="w3-button w3-blue"
                      data-testid="test-submit-button"
                    >
                    Submit
                    </button>
                  </p>
                </form>
              </div>
            }
            {
              this.state.currentSetting === 'del' &&
              <div style={{ margin: '1rem' }}>
                <h1 className="w3-xxlarge">Delete account</h1>
                <hr className="w3-border-top w3-border-black" />
                <button
                  className="w3-button w3-blue"
                  onClick={ () => this.setState({ currentSetting: 'main' }) }
                >
                &laquo; Back
                </button>
                <p>
                  <button className="w3-button w3-red w3-large" onClick={ this.deleteAccount }>DELETE ACCOUNT</button>
                </p>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default UserSettings
