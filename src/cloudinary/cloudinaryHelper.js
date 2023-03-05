import { Cloudinary } from '@cloudinary/url-gen'
import { blur } from '@cloudinary/url-gen/actions/effect'

import { cloudName, uploadPreset } from './cloudinaryConfig'

const baseUrl = `https://api.cloudinary.com/v1_1/${cloudName}`

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dze60m7yr'
  },
  url: {
    secure: true
  }
})

export const makeUploadRequest = ({
  file,
  fieldName,
  progressCallback,
  successCallback,
  errorCallback
}) => {
//   console.log('file', file)
//   console.log('fieldName', fieldName)
  const url = `${baseUrl}/image/upload`

  const formData = new FormData()
  formData.append(fieldName, file)
  formData.append('upload_preset', uploadPreset)

  const request = new XMLHttpRequest()
  request.open('POST', url)

  request.upload.onprogress = (e) => {
    progressCallback(e.lengthComputable, e.loaded, e.total)
  }

  request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
      const {
        delete_token: deleteToken,
        public_id: publicId,
        secure_url: url
      } = JSON.parse(request.response)

      // blurImage()
      successCallback(deleteToken)
    } else {
      errorCallback(request.responseText)
    }
  }

  request.send(formData)

  return () => {
    request.abort()
  }
}

export const makeDeleteRequest = ({
  token,
  successCallback,
  errorCallback
}) => {
  const url = `${baseUrl}/delete_by_token`

  const request = new XMLHttpRequest()
  request.open('POST', url)

  request.setRequestHeader('Content-Type', 'application/json')

  request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
      successCallback()
    } else {
      errorCallback(request.responseText)
    }
  }
  request.send(JSON.stringify({ token }))
}

export const blurImage = ({ publicId, strength }) => {
  const image = cld.image(publicId)
  const imageBlur =
      image
        .effect(blur().strength(strength))
        .format('auto')
        .quality('auto')

  return imageBlur.toURL()
}
