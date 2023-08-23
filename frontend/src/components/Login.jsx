// src/components/Login.jsx
import { Component } from 'react'
import axios from 'axios'

class Login extends Component {
  login = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/api/login', {
      email: document.getElementById('email').value,
      pwd: document.getElementById('password').value
    })
      .then((res) => {
        console.log(res.data)
      })
  }

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
                                data-testid="test-email"
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
