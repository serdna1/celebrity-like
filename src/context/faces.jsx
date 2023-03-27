import { useState, createContext } from 'react'

import { optimizeImage } from '../service/cloudinary'

export const FacesContext = createContext()

export const FacesProvider = ({ children }) => {
  const [url, setUrl] = useState('')
  const [faces, setFaces] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const refreshFaces = ({ publicId, info }) => {
    setLoading(false)

    setFaces([])

    const celebrityFaces = info.detection.aws_rek_face.data.celebrity_faces
    const unrecognizedFaces = info.detection.aws_rek_face.data.unrecognized_faces

    celebrityFaces.forEach((face, i) => {
      const key = publicId + i
      const isCelebrity = true
      const name = face.name
      const boundingBox = face.face.bounding_box
      const emotionType = face.face.emotions[0].type // emotions are already sorted by confidence
      const url = optimizeImage({ publicId })

      setUrl(url)
      setFaces((oldFaces) => (
        [...oldFaces, { key, isCelebrity, name, boundingBox, emotionType }]
      ))

      // searchCelebrity({ name })
      //   .then((celebrityDetails) => {
      //     setUrl(url)
      //     setFaces((oldFaces) => (
      //       [...oldFaces, { key: publicId + i, name, boundingBox, emotionType, ...celebrityDetails }]
      //     ))
      //   })
    })

    const celebrityFacesLength = celebrityFaces.length

    unrecognizedFaces.forEach((face, i) => {
      const key = publicId + celebrityFacesLength + i
      const isCelebrity = false
      const boundingBox = face.bounding_box
      const emotionType = face.emotions[0].type // emotions are already sorted by confidence
      const url = optimizeImage({ publicId })

      setUrl(url)
      setFaces((oldFaces) => (
        [...oldFaces, { key, isCelebrity, boundingBox, emotionType }]
      ))
    })
  }

  return (
    <FacesContext.Provider value={{
      url,
      setUrl,
      faces,
      setFaces,
      loading,
      setLoading,
      error,
      setError,
      refreshFaces
    }}
    >
      {children}
    </FacesContext.Provider>
  )
}
