import { useState, createContext } from 'react'

export const CelebritiesContext = createContext()

export const CelebritiesProvider = ({ children }) => {
  const [celebrities, setCelebrities] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return (
    <CelebritiesContext.Provider value={{
      celebrities,
      setCelebrities,
      loading,
      setLoading,
      error,
      setError
    }}
    >
      {children}
    </CelebritiesContext.Provider>
  )
}
