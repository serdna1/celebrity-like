import { useContext } from 'react'
import { ImagesContext } from '../context/images'
import Rusha from 'rusha'

import { apiKey, cloudName, uploadPreset, apiSecret } from './cloudinaryConfig'
import { useCelebrities } from '../hooks/useCelebrities'
import { searchCelebrity } from '../service/celebrities'
import { makeTransformations } from '../service/cloudinary'

const baseUrl = `https://api.cloudinary.com/v1_1/${cloudName}`

export const useUpload = () => {
  console.log('useUpload')

  const { setCelebrity } = useContext(ImagesContext)

  const refreshCelebrityDetails = ({ name }) => {
    searchCelebrity({ name })
      .then((newCelebrityDetails) => setCelebrity((oldCelebrity) => ({
        ...oldCelebrity,
        ...newCelebrityDetails
      })))
  }

  const makeUploadRequest = ({
    file,
    fieldName,
    progressCallback,
    successCallback,
    errorCallback
  }) => {
    const url = `${baseUrl}/image/upload`

    const formData = new FormData()
    formData.append(fieldName, file)
    formData.append('upload_preset', uploadPreset)
    formData.append('api_key', apiKey)
    // formData.append('detection', 'aws_rek_face')

    const timestamp = Date.now() / 1000
    formData.append('timestamp', timestamp)

    // const stringToSign = `detection=aws_rek_face&timestamp=${timestamp}&upload_preset=asnf0nj6${apiSecret}`
    const stringToSign = `timestamp=${timestamp}&upload_preset=asnf0nj6${apiSecret}`
    const signature = Rusha.createHash().update(stringToSign).digest('hex')
    formData.append('signature', signature)

    const request = new XMLHttpRequest()
    request.open('POST', url)

    request.upload.onprogress = (e) => {
      progressCallback(e.lengthComputable, e.loaded, e.total)
    }

    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        const {
          delete_token: deleteToken,
          public_id: publicId
          // secure_url: celebrityURL,
          // info
        } = JSON.parse(request.response)
        // console.log(request.response)

        const name = 'david tennant'
        const emotion = 'HAPPY'

        const celebrityURL = makeTransformations({ publicId, name, emotion })

        setCelebrity((oldCelebrity) => ({
          ...oldCelebrity,
          celebrityURL
        }))

        // const celebrityFaces = info.detection.aws_rek_face.data.celebrity_faces
        // const name = (celebrityFaces.length > 0) ? celebrityFaces[0].name : ''
        refreshCelebrityDetails({ name })

        // const newCelebrityURL = blurImage({ publicId, strength: 600 })
        // setCelebrityURL(newCelebrityURL)

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

  const makeDeleteRequest = ({
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

  return {
    makeUploadRequest,
    makeDeleteRequest
  }
}
