import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CelebritiesProvider } from './context/celebrities'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CelebritiesProvider>
    <App />
  </CelebritiesProvider>
  // </React.StrictMode>
)
