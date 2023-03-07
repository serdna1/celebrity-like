import { useContext } from 'react'
import { CelebritiesContext } from '../context/celebrities'
import { CelebrityCard } from './CelebrityCard'

import './CelebrityList.css'

export const CelebrityList = () => {
  const { celebrities, loading, error } = useContext(CelebritiesContext)

  return (
    <>
      <h2>Results:</h2>
      {(celebrities.length <= 0) && !loading && !error && <p className='error'>No faces</p>}
      {loading && <p className='loading'>Loading...</p>}
      {error && <p className='error'>{error}</p>}
      <div className='cards'>
        {
        celebrities.map(celebrity => (
          <CelebrityCard key={celebrity.celebrityURL} moreDataURL={celebrity.moreDataURL} url={celebrity.celebrityURL} occupation={celebrity.occupation} />
        ))
      }
      </div>
    </>
  )
}
