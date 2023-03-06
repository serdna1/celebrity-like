import { Cloudinary, Transformation } from '@cloudinary/url-gen'

import { source } from '@cloudinary/url-gen/actions/overlay'
import { crop, scale } from '@cloudinary/url-gen/actions/resize'
import { format, quality } from '@cloudinary/url-gen/actions/delivery'

import { image, text } from '@cloudinary/url-gen/qualifiers/source'
import { Position } from '@cloudinary/url-gen/qualifiers/position'
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle'
import { autoGravity, compass, focusOn } from '@cloudinary/url-gen/qualifiers/gravity'
import { webp } from '@cloudinary/url-gen/qualifiers/format'
import { autoLow } from '@cloudinary/url-gen/qualifiers/quality'
import { face, faces } from '@cloudinary/url-gen/qualifiers/focusOn'

const CLOUDINARY_API_PREFIX = 'https://api.cloudinary.com/v1_1/'
const CLOUD_NAME = 'dze60m7yr'
const UPLOAD_PRESET = 'afpzm8lz'
const API_KEY = '395366624821627'

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dze60m7yr'
  },
  url: {
    secure: true
  }
})

const emotionsToPublicID = ({ emotion }) => {
  if (emotion === 'HAPPY') return 'happy-emoji_esi26i'
  return ''
}

export const makeTransformations = ({ publicId, name, emotion }) => {
  const img = cld.image(publicId)
  const imageOverlay =
        img
          .resize(scale().width(600))
          .resize(
            crop()
              .width(300)
              .height(300)
              .gravity(autoGravity())
          )
          .overlay(
            source(
              text(
                name,
                new TextStyle('arial', 32)
                  .fontWeight('bold')
                  .fontStyle('normal')
                  .textAlignment('left')
              ).textColor('#FFFFFF')
            ).position(
              new Position()
                .gravity(compass('south'))
                .offsetY(8)
            )
          )
          .overlay(
            source(
              image(emotionsToPublicID({ emotion })).transformation(
                new Transformation().resize(scale().width(50))
              )
            ).position(
              new Position()
                .gravity(compass('north_east'))
                .offsetX(8)
                .offsetY(8)
            )
          )
          .delivery(format(webp()))
          .delivery(quality(autoLow()))

  console.log('image transformed', imageOverlay.toURL())

  return imageOverlay.toURL()
}

// export const uploadImage = async ({ url }) => {
//   try {
//     const formData = new FormData()

//     formData.append('file', url)
//     formData.append('upload_preset', UPLOAD_PRESET)
//     formData.append('api_key', API_KEY)

//     const response = await fetch(`${CLOUDINARY_API_PREFIX}${CLOUD_NAME}/image/upload`, {
//       method: 'POST',
//       body: formData
//     })
//     const json = await response.json()

//     return json
//   } catch (e) {
//     throw new Error(e)
//   }
// }

// export const blurImage = ({ publicId, strength }) => {
//   const image = cld.image(publicId)
//   const imageBlur =
//     image
//       .effect(blur().strength(strength))
//       .format('auto')
//       .quality('auto')

//   return imageBlur
// }
