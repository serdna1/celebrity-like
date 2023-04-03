import { useState, useContext, useRef } from 'react'

import { FacesContext } from '../context/faces'

import './Faces.css'

export const Faces = () => {
  const { faces } = useContext(FacesContext)
  const [displayArticle, setDisplayArticle] = useState({})
  const faceContourDivs = useRef([])
  const faceDataArticles = useRef([])

  const handleOnMouseEnter = (i) => {
    setDisplayArticle(old => ({ ...old, [i]: true }))
  }

  const handleOnMouseLeave = (i) => {
    setDisplayArticle(old => ({ ...old, [i]: false }))
  }

  const faceDataArticleStyles = (i) => {
    const faceContourDivRect = faceContourDivs.current[i]?.getBoundingClientRect()
    const faceDataArticleRect = faceDataArticles.current[i]?.getBoundingClientRect()
    if ((!faceContourDivRect) || (!faceDataArticleRect)) return {}
    const faceContourDivLeft = faceContourDivRect.left
    const faceDataArticleWidth = faceDataArticleRect.width
    const windowInnerWidth = window.innerWidth
    if ((faceContourDivLeft + faceDataArticleWidth) > windowInnerWidth) return { right: 0 }
    return {}
  }

  return (
    <>
      {
        faces.map((face, i) => (
          <div
            ref={el => { faceContourDivs.current[i] = el }}
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
              ref={el => { faceDataArticles.current[i] = el }}
              className='faceData'
              style={
                      {
                        visibility: displayArticle[i] ? 'visible' : 'hidden',
                        top: '105%',
                        ...faceDataArticleStyles(i)
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
