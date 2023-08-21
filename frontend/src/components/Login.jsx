// src/components/Login.jsx
import { Component } from 'react'

class Login extends Component {
  render () {
    return (
            <div className="w3-card-4" style={{ margin: '2rem' }}>
                <div className="w3-container w3-blue w3-center w3-xlarge">
                    LOGIN
                </div>
                <div className="w3-container">
                    <form>
                        <p>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="w3-input w3-border"
                                id="email"
                            />
                        </p>
                        <p>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="w3-input w3-border"
                                id="password"
                            />
                        </p>
                        <p>
                            <button type="submit" className="w3-button w3-blue">
                                Login
                            </button>
                        </p>
                    </form>
                </div>
            </div>
    )
  }
}

export default Login
