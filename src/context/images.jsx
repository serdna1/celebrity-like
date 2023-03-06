import { useState, createContext } from 'react'

export const ImagesContext = createContext()

export const ImagesProvider = ({ children }) => {
  const [celebrity, setCelebrity] = useState(null)

  return (
    <ImagesContext.Provider value={{
      celebrity,
      setCelebrity
    }}
    >
      {children}
    </ImagesContext.Provider>
  )
}
