import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { FacesProvider } from './context/faces'

ReactDOM.createRoot(document.getElementById('root')).render(
  <FacesProvider>
    <App />
  </FacesProvider>
)
