import { useState, createContext } from 'react'

export const ImagesContext = createContext()

export const ImagesProvider = ({ children }) => {
  const [celebrities, setCelebrities] = useState([])

  return (
    <ImagesContext.Provider value={{
      celebrities,
      setCelebrities
    }}
    >
      {children}
    </ImagesContext.Provider>
  )
}
