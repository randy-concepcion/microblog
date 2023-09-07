// src/utils/login.js
import Axios from 'axios'

async function login (email, pwd) {
  const response = await Axios.post('http://localhost:5000/api/login', { email, pwd })
  const { data } = await response

  if (data.error) {
    return data.error
  } else {
    localStorage.setItem('token', data.token)
    return true
  }
}

export { login }
