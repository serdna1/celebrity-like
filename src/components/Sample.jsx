import { useContext } from 'react'

import { cloudName } from '../config/cloudinaryConfig'
import { FacesContext } from '../context/faces'

import './Sample.css'

export const Sample = ({ publicId, alt, info }) => {
  const { refreshFaces } = useContext(FacesContext)

  return (
    <button
      className='sampleButton'
      onClick={() => refreshFaces({ publicId, info })}
    >
      <div className='sample'>
        <img
          src={`https://res.cloudinary.com/${cloudName}/image/upload/c_thumb,g_auto:faces,h_150,w_150,z_0.6/f_webp/q_auto/${publicId}`}
          alt={`${alt}`}
        />
      </div>
    </button>
  )
}
