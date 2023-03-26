import { Cloudinary } from '@cloudinary/url-gen'

import { cloudName } from '../config/cloudinaryConfig'

const cld = new Cloudinary({
  cloud: {
    cloudName
  },
  url: {
    secure: true
  }
})

export const optimizeImage = ({ publicId }) => {
  const image = cld.image(publicId)
  const optimizedImage =
    image
      .format('auto')
      .quality('auto')

  return optimizedImage.toURL()
}
