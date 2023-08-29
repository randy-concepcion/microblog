// src/components/Register.jsx
import { Component } from 'react'
import axios from 'axios'
import Alert from './Alert'

class Register extends Component {
  state = { err: '' }

  register = (e) => {
    e.preventDefault()

    axios
      .post('http://localhost:5000/api/register', {
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        pwd: document.getElementById('password').value
      })
      .then((res) => {
        console.log('success', res)
        this.setState({ register: true })
      })
      .catch((error) => {
        console.log('error', error.response.data.error)
        this.setState({ err: error.response.data.error })
      })
  }

  render () {
    return (
            <div className="w3-card-4" style={{ margin: '2rem' }}>
                <div className="w3-container w3-blue w3-center w3-xlarge">
                    REGISTER
                </div>
                <div className="w3-container">
                    { this.state.err.length > 0 && (
                      <Alert
                        message={`Check your form and try again! (${this.state.err})`}
                      />
                    )}
                    <form onSubmit={this.register}>
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
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="username"
                                className="w3-input w3-border"
                                data-testid="test-username"
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
                        <p>
                            <button type="submit" className="w3-button w3-blue" data-testid="test-submit-button">
                                Register
                            </button>
                            <div data-testid="test-success-msg">
                              {this.state.register && 'You\'re registered!'}
                            </div>
                        </p>
                    </form>
                </div>
            </div>
    )
  }
}

export default Register
