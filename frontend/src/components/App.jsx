// src/components/App.jsx
import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import MainPage from './MainPage'
import Navbar from './Navbar'
import React from 'react'
import Register from './Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { checkToken } from '../utils/login'

function App () {
  const [login, setLogin] = React.useState(false)

  checkToken().then(response => setLogin(response))

  return (
        <React.Fragment>
            <Navbar />
            <Router>
                <Routes>
                        <Route path="/" exact element={ login ? <MainPage /> : <Home />} />
                        <Route path="/login" exact element={<Login />} />
                        <Route path="/register" exact element={<Register />} />
                        <Route path="/logout" exact element={<Logout />} />
                </Routes>
            </Router>
        </React.Fragment>
  )
}

export default App
