// src/components/Navbar.jsx
import PropTypes from 'prop-types'

function Navbar ({ isLoggedIn }) {
  return (
        <div className="w3-bar w3-black" data-testid="test-navbar">
            <a className="w3-bar-item w3-button" href="/">
                Quickr
            </a>
            <div style={{ float: 'right' }}>
                { isLoggedIn
                  ? (
                    <a className="w3-bar-item w3-button" href="/logout">
                        Logout
                    </a>
                    )
                  : (
                    <a className="w3-bar-item w3-button" href="/login">
                        Login
                    </a>
                    )
                }
                <a className="w3-bar-item w3-button" href="/register">
                    Register
                </a>
            </div>
        </div>
  )
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool
}

export default Navbar
