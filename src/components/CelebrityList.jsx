import { useContext } from 'react'
import { ImagesContext } from '../context/images'
import { CelebrityCard } from './CelebrityCard'

import './CelebrityList.css'

export const CelebrityList = () => {
  const { celebrities } = useContext(ImagesContext)

  return (
    <>
      <h2>Results:</h2>
      <div className='cards'>
        {
        celebrities.map(celebrity => (
          <CelebrityCard moreDataURL={celebrity.moreDataURL} url={celebrity.celebrityURL} occupation={celebrity.occupation} />
        ))
      }
      </div>
    </>
  )
}
