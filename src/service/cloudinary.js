import { Cloudinary, Transformation } from '@cloudinary/url-gen'

import { source } from '@cloudinary/url-gen/actions/overlay'
import { crop, scale } from '@cloudinary/url-gen/actions/resize'
import { format, quality } from '@cloudinary/url-gen/actions/delivery'

import { image, text } from '@cloudinary/url-gen/qualifiers/source'
import { Position } from '@cloudinary/url-gen/qualifiers/position'
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle'
import { compass } from '@cloudinary/url-gen/qualifiers/gravity'
import { webp } from '@cloudinary/url-gen/qualifiers/format'
import { autoLow } from '@cloudinary/url-gen/qualifiers/quality'

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dze60m7yr'
  },
  url: {
    secure: true
  }
})

const emotionsToPublicID = ({ emotionType }) => {
  if (emotionType === 'HAPPY') return 'happy-emoji_d0bixy'
  if (emotionType === 'SURPRISED') return 'surprised-emoji_oarf1d'
  if (emotionType === 'FEAR') return 'fear-emoji_xqub9n'
  if (emotionType === 'SAD') return 'sad-emoji_yoohsn'
  if (emotionType === 'ANGRY') return 'angry-emoji_tjuw9r'
  if (emotionType === 'CONFUSED') return 'confused-emoji_znvr3k'
  if (emotionType === 'CALM') return 'calm-emoji_amsm9b'
  if (emotionType === 'DISGUSTED') return 'disgusted-emoji_qithhh'
  return 'happy-emoji_d0bixy' // return happy by default
}

// crop to adjust to the face boundaries, scale with to 300 and height to auto
// overlay of name, overlay of an emoji relative to the emotion,
// formatting to .webp and set the quality to auto low
export const makeTransformations = ({ publicId, originalWidth, originalHeight, boundingBox, name, emotionType }) => {
  const img = cld.image(publicId)
  const imageOverlay =
        img
          .resize(
            crop()
              .width(Math.floor(originalWidth * boundingBox.width))
              .height(Math.floor(originalHeight * boundingBox.height))
              .x(Math.floor(originalWidth * boundingBox.left))
              .y(Math.floor(originalHeight * boundingBox.top))
          )
          .resize(scale().width(300))
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
              image(emotionsToPublicID({ emotionType })).transformation(
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
