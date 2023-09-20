// src/utils/login.js
import axios from 'axios'

async function login (email, pwd) {
  const response = await axios.post('/api/login', { email, pwd })
  const { data } = await response

  if (data.error) {
    return data.error
  } else {
    localStorage.setItem('token', data.token)
    localStorage.setItem('refreshToken', data.refreshToken)
    return true
  }
}

async function checkToken () {
  const token = localStorage.getItem('token')

  try {
    const response = await axios.post('/api/token_expiration', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const { data } = await response
    return data.success
  } catch {
    console.log('p')
    const refreshToken = localStorage.getItem('refreshToken')

    if (!refreshToken) {
      localStorage.removeItem('token')
      return false
    }

    axios.post('/api/refresh_token', {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    }).then(response => {
      localStorage.setItem('token', response.data.token)
    })

    return true
  }
}

export { login, checkToken }
