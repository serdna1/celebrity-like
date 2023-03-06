import { useContext } from 'react'
import { ImagesContext } from '../context/images'
import { CelebrityCard } from './CelebrityCard'

import './CelebrityList.css'

export const CelebrityList = () => {
  const { celebrities } = useContext(ImagesContext)

  return (
    <div className='cards'>
      {
        celebrities.map(celebrity => (
          <CelebrityCard url={celebrity.celebrityURL} occupation={celebrity.occupation} />
        ))
      }
    </div>
  )
}
