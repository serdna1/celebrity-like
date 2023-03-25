import { useState, createContext } from 'react'

export const FacesContext = createContext()

export const FacesProvider = ({ children }) => {
  const [url, setUrl] = useState('')
  const [faces, setFaces] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return (
    <FacesContext.Provider value={{
      url,
      setUrl,
      faces,
      setFaces,
      loading,
      setLoading,
      error,
      setError
    }}
    >
      {children}
    </FacesContext.Provider>
  )
}
