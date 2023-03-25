import { Cloudinary } from '@cloudinary/url-gen'

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dze60m7yr'
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
