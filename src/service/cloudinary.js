import { Cloudinary, Transformation } from '@cloudinary/url-gen'

import { source } from '@cloudinary/url-gen/actions/overlay'
import { crop, scale } from '@cloudinary/url-gen/actions/resize'
import { format, quality } from '@cloudinary/url-gen/actions/delivery'

import { image, text } from '@cloudinary/url-gen/qualifiers/source'
import { Position } from '@cloudinary/url-gen/qualifiers/position'
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle'
import { autoGravity, compass } from '@cloudinary/url-gen/qualifiers/gravity'
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

const emotionsToPublicID = ({ emotion }) => {
  if (emotion === 'HAPPY') return 'happy-emoji_d0bixy'
  if (emotion === 'SURPRISED') return 'surprised-emoji_oarf1d'
  if (emotion === 'FEAR') return 'fear-emoji_xqub9n'
  if (emotion === 'SAD') return 'sad-emoji_yoohsn'
  if (emotion === 'ANGRY') return 'angry-emoji_tjuw9r'
  if (emotion === 'CONFUSED') return 'confused-emoji_znvr3k'
  if (emotion === 'CALM') return 'calm-emoji_amsm9b'
  if (emotion === 'DISGUSTED') return 'disgusted-emoji_qithhh'
  return 'happy-emoji_d0bixy' // return happy by default
}

// rezize to 600x600, crop to 300x300 focusing on face,
// overlay of name, overlay of an emoji relative to the emotion,
// formatting to .webp and set the quality to auto low
export const makeTransformations = ({ publicId, originalWidth, originalHeight, boundingBox, name, emotion }) => {
  const img = cld.image(publicId)
  console.log('img', img)
  console.log('originalWidth', originalWidth)
  console.log('originalHeight', originalHeight)
  console.log('boundingBox', boundingBox)
  const imageOverlay =
        img
          .resize(
            crop()
              .width(Math.floor(originalWidth * boundingBox.width))
              .height(Math.floor(originalHeight * boundingBox.height))
              .x(Math.floor(originalWidth * boundingBox.left))
              .y(Math.floor(originalHeight * boundingBox.top))
              // .width(30)
              // .height(30)
              // .x(30)
              // .y(30)
          )
          // .resize(scale().width(600))
          // .resize(
          //   crop()
          //     .width(300)
          //     .height(300)
          //     .gravity(autoGravity())
          // )
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

// https://res.cloudinary.com/demo/image/upload/x_385,y_90,w_300,h_250,c_crop/kitten.jpg
