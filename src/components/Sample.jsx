import { cloudName } from '../config/cloudinaryConfig'

import './Sample.css'

export const Sample = ({ filename, alt }) => {
  return (
    <a href={`https://res.cloudinary.com/${cloudName}/image/upload/v1678100497/celebrity-like/${filename}`}>
      <div className='sample'>
        <img src={`https://res.cloudinary.com/${cloudName}/image/upload/c_thumb,g_auto:face,h_150,w_150,z_0.7/f_webp/q_auto:low/celebrity-like/${filename}`} alt={`${alt}`} />
      </div>
    </a>
  )
}
