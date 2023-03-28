import { useRef, useEffect, useContext } from 'react'

import { FacesContext } from '../context/faces'
import { Faces } from './Faces'

import './Result.css'

export const Result = () => {
  const { url, setLoading, loading } = useContext(FacesContext)
  const resultImage = useRef(null)

  useEffect(() => {
    const loaded = () => {
      setLoading(false)
    }

    resultImage.current.addEventListener('load', loaded)

    return () => {
      resultImage.current.removeEventListener('load', loaded)
    }
  }, [resultImage])

  return (
    <section className='result'>
      <div className='resultImageContainer'>
        {loading && <p className='loading'>Loading...</p>}
        <div
          className='imageWrapper'
          style={{ display: loading ? 'none' : 'block' }}
        >
          <img
            ref={resultImage}
            src={url}
            alt='Optimized uploaded image'
          />
          <Faces />
        </div>
      </div>
    </section>
  )
}

// import { useContext } from 'react'
// import { FacesContext } from '../context/faces'
// import { CelebrityCard } from './CelebrityCard'

// import './CelebrityList.css'

// export const CelebrityList = () => {
//   const { celebrities, loading, error } = useContext(FacesContext)

//   return (
//     <>
//       <h2>Results:</h2>
//       {(celebrities.length <= 0) && !loading && !error && <p className='error'>No faces</p>}
//       {loading && <p className='loading'>Loading...</p>}
//       {error && <p className='error'>{error}</p>}
//       <div className='cards'>
//         {
//         celebrities.map(celebrity => (
//           <CelebrityCard key={celebrity.celebrityURL} moreDataURL={celebrity.moreDataURL} url={celebrity.celebrityURL} occupation={celebrity.occupation} />
//         ))
//       }
//       </div>
//     </>
//   )
// }
