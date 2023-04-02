import { useRef, useEffect, useContext } from 'react'

import { Loader } from './Loader'
import { FacesContext } from '../context/faces'
import { Faces } from './Faces'

import './Result.css'

export const Result = () => {
  const { url, setLoading, loading, error } = useContext(FacesContext)
  const resultImage = useRef(null)

  useEffect(() => {
    const onLoad = () => {
      setLoading(false)
    }

    resultImage.current.addEventListener('load', onLoad)

    return () => {
      resultImage.current.removeEventListener('load', onLoad)
    }
  }, [resultImage])

  return (
    <section className='result'>
      <div className='resultImageContainerWrapper'>
        <div className='resultImageContainer'>
          {
            loading &&
              <div className='loadingMessage'>
                <p>Loading</p>
                <Loader />
              </div>
          }
          {error && <p className='error'>{error}</p>}
          <div
            className='imageWrapper'
            style={{ display: !url || loading || error ? 'none' : 'block' }}
          >
            <img
              ref={resultImage}
              src={url}
              alt='Optimized uploaded image'
            />
            <Faces />
          </div>
        </div>
      </div>
    </section>
  )
}
