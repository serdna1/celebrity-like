import { useContext, useCallback } from 'react'
import Rusha from 'rusha'

import { CelebritiesContext } from '../context/celebrities'
import { apiKey, cloudName, uploadPreset, apiSecret } from '../cloudinary/cloudinaryConfig'
import { searchCelebrity } from '../service/celebrities'
import { makeTransformations } from '../service/cloudinary'

const baseUrl = `https://api.cloudinary.com/v1_1/${cloudName}`

// This hook is used along the filepond dependency (the dropzone)
export const useUpload = () => {
  const { setCelebrities } = useContext(CelebritiesContext)

  const makeUploadRequest = useCallback(({
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
    formData.append('detection', 'aws_rek_face') // we need to set this param in order to get the recognized faces in the response

    const timestamp = Date.now() / 1000
    formData.append('timestamp', timestamp)

    const stringToSign = `detection=aws_rek_face&timestamp=${timestamp}&upload_preset=asnf0nj6${apiSecret}`
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
          public_id: publicId,
          info,
          width: originalWidth,
          height: originalHeight
        } = JSON.parse(request.response)

        setCelebrities([])

        const celebrityFaces = info.detection.aws_rek_face.data.celebrity_faces // recognized faces

        celebrityFaces.forEach(face => {
          const name = face.name
          const emotionType = face.face.emotions[0].type // emotions are already sorted by confidence
          const boundingBox = face.face.bounding_box
          const celebrityURL = makeTransformations({ publicId, originalWidth, originalHeight, boundingBox, name, emotionType })

          const moreDataURL = face.urls[0]

          searchCelebrity({ name })
            .then((newCelebrityDetails) => setCelebrities((oldCelebrity) => (
              [...oldCelebrity, { celebrityURL, moreDataURL, ...newCelebrityDetails }]
            )))
        })

        // si non reconoce ningunha cara estaria ben setear un error

        successCallback(deleteToken)
      } else {
        errorCallback(request.responseText)
      }
    }

    request.send(formData)

    return () => {
      request.abort()
    }
  }, [])

  const makeDeleteRequest = useCallback(({
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
  }, [])

  return {
    makeUploadRequest,
    makeDeleteRequest
  }
}
