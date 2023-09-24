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

function logout () {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token')

    axios.post('/api/logout/access', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if (response.data.error) {
        console.error(response.data.error)
      } else {
        localStorage.removeItem('token')
      }
    })
  }

  if (localStorage.getItem('refreshToken')) {
    const refreshToken = localStorage.getItem('refreshToken')

    axios.post('/api/logout/refresh', {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    }).then(response => {
      if (response.data.error) {
        console.error(response.data.error)
      } else {
        localStorage.removeItem('refreshToken')
      }
    })
  }

  localStorage.clear()
  setTimeout(() => { window.location = '/' }, 500)
}

export { login, checkToken, logout }
