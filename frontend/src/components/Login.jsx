// src/components/Login.jsx
import { Component } from 'react'
import Alert from './Alert'
import { login } from '../utils/login'

class Login extends Component {
  state = { err: '' }

  login = (e) => {
    e.preventDefault()
    login(
      document.getElementById('email').value,
      document.getElementById('password').value)
      .then((res) => {
        if (res === true) {
          window.location = '/'
        } else {
          this.setState({ err: res })
        }
      })
  }

  render () {
    return (
            <div className="w3-card-4" style={{ margin: '2rem' }}>
                <div className="w3-container w3-blue w3-center w3-xlarge">
                    LOGIN
                </div>
                <div className="w3-container">
                    {this.state.err.length > 0 && (
                      <Alert
                        message={`Check your form and try again! (${this.state.err})`}
                      />
                    )}
                    <form onSubmit={this.login}>
                        <p>
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="w3-input w3-border"
                                data-testid="test-email"
                            />
                        </p>
                        <p>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="w3-input w3-border"
                                data-testid="test-password"
                            />
                        </p>
                        <div style={{ marginBottom: '1rem' }}>
                            <button type="submit" className="w3-button w3-blue" data-testid="test-submit-button">
                                Login
                            </button>
                            <div data-testid="test-success-msg">
                              {this.state.login && 'You\'re logged in!'}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    )
  }
}

export default Login
