import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'
import './ui/styles/tokens.css'
import './ui/styles/components.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root was not found')

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
