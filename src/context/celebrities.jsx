import { useState, createContext } from 'react'

export const CelebritiesContext = createContext()

export const CelebritiesProvider = ({ children }) => {
  const [celebrities, setCelebrities] = useState([])

  return (
    <CelebritiesContext.Provider value={{
      celebrities,
      setCelebrities
    }}
    >
      {children}
    </CelebritiesContext.Provider>
  )
}
