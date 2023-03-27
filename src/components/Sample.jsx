import { cloudName } from '../config/cloudinaryConfig'

import './Sample.css'

export const Sample = ({ filename, alt }) => {
  return (
    <a href={`https://res.cloudinary.com/${cloudName}/image/upload/v1678100497/celebrity-like/samples/${filename}`}>
      <div className='sample'>
        <img src={`https://res.cloudinary.com/${cloudName}/image/upload/c_thumb,g_auto:faces,h_150,w_150,z_0.6/f_webp/q_auto/celebrity-like/samples/${filename}`} alt={`${alt}`} />
      </div>
    </a>
  )
}
