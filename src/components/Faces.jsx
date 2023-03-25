import { useContext } from 'react'

import { FacesContext } from '../context/faces'

import './Faces.css'

export const Faces = () => {
  const { faces } = useContext(FacesContext)

  return (
    <>
      {
        faces.map(face => (
          <div
            key={face.key}
            className='contour'
            style={
                    {
                      width: `${face.boundingBox.width * 100}%`,
                      height: `${face.boundingBox.height * 100}%`,
                      left: `${face.boundingBox.left * 100}%`,
                      top: `${face.boundingBox.top * 100}%`
                    }
                  }
          />
        ))
      }
    </>
  )
}
