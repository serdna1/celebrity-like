import { useContext } from 'react'
import { CelebritiesContext } from '../context/celebrities'
import { CelebrityCard } from './CelebrityCard'

import './CelebrityList.css'

export const CelebrityList = () => {
  const { celebrities } = useContext(CelebritiesContext)

  return (
    <>
      {(celebrities.length > 0) && <h2>Results:</h2>}
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
