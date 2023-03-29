import { useState, useContext } from 'react'

import { FacesContext } from '../context/faces'

import './Faces.css'

export const Faces = () => {
  const { faces } = useContext(FacesContext)
  const [displayArticle, setDisplayArticle] = useState({})

  const handleOnMouseEnter = (i) => {
    setDisplayArticle(old => ({ ...old, [i]: true }))
  }

  const handleOnMouseLeave = (i) => {
    setDisplayArticle(old => ({ ...old, [i]: false }))
  }

  return (
    <>
      {
        faces.map((face, i) => (
          <div
            key={face.key}
            className='contour'
            style={
                    {
                      width: `${face.boundingBox.width * 100}%`,
                      height: `${face.boundingBox.height * 100}%`,
                      left: `${face.boundingBox.left * 100}%`,
                      top: `${face.boundingBox.top * 100}%`,
                      borderColor: face.isCelebrity ? 'var(--contours-primary)' : 'var(--contours-secondary)'
                    }
                  }
            onMouseEnter={() => handleOnMouseEnter(i)}
            onMouseLeave={() => handleOnMouseLeave(i)}
          >
            <article
              className='faceData'
              style={
                      {
                        display: displayArticle[i] ? 'block' : 'none',
                        top: '105%'
                      }
                    }
            >
              <p>Name: {face.isCelebrity ? face.name : 'not famous'}</p>
              <p>Emotion: {face.emotionType}</p>
            </article>
          </div>
        ))
      }
    </>
  )
}
