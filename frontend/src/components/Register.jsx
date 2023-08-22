// src/components/Register.jsx
import { Component } from 'react'

class Register extends Component {
  render () {
    return (
            <div className="w3-card-4" style={{ margin: '2rem' }}>
                <div className="w3-container w3-blue w3-center w3-xlarge">
                    REGISTER
                </div>
                <div className="w3-container">
                    <form>
                        <p>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="w3-input w3-border"
                                data-testid="test-email"
                            />
                        </p>
                        <p>
                            <label htmlFor="username">Username</label>
                            <input
                                type="username"
                                className="w3-input w3-border"
                                data-testid="test-username"
                            />
                        </p>
                        <p>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="w3-input w3-border"
                                data-testid="test-password"
                            />
                        </p>
                        <p>
                            <button type="submit" className="w3-button w3-blue" data-testid="test-submit-button">
                                Register
                            </button>
                        </p>
                    </form>
                </div>
            </div>
    )
  }
}

export default Register
