// src/index.js
import ReactDOM from 'react-dom/client'
import App from './components/App'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
