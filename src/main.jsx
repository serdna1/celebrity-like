import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CelebrityLikeApp } from './CelebrityLikeApp'
import { ImagesProvider } from './context/images'
import { Pruebas } from './Pruebas'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ImagesProvider>
    {/* <CelebrityLikeApp /> */}
    <App />
    {/* <Pruebas /> */}
  </ImagesProvider>
  // </React.StrictMode>
)
