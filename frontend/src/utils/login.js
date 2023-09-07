// src/utils/login.js
import axios from 'axios'

async function login (email, pwd) {
  const response = await axios.post('http://localhost:5000/api/login', { email, pwd })
  const { data } = await response

  if (data.error) {
    return data.error
  } else {
    localStorage.setItem('token', data.token)
    return true
  }
}

function checkToken() {
  if (localStorage.getItem('token')) {
    return true
  }

  return false
}

export { login, checkToken }
