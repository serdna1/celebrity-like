import { useContext } from 'react'
import Rusha from 'rusha'

import { FacesContext } from '../context/faces'
import { apiKey, cloudName, uploadPreset, apiSecret } from '../cloudinary/cloudinaryConfig'
import { searchCelebrity } from '../service/celebrities'
import { optimizeImage } from '../service/cloudinary'
import { rihannaAwkward, rollings } from '../mocks'

const baseUrl = `https://api.cloudinary.com/v1_1/${cloudName}`

// This hook is used along the filepond dependency (the dropzone)
export const useFilePondServer = () => {
  const { setUrl, setFaces, setLoading, setError } = useContext(FacesContext)

  const process = (
    fieldName,
    file,
    metadata,
    load,
    error,
    progress,
    abort,
    transfer,
    options
  ) => {
    setLoading(true)

    const url = `${baseUrl}/image/upload`

    const formData = new FormData()
    formData.append(fieldName, file)
    formData.append('upload_preset', uploadPreset)
    // formData.append('api_key', apiKey)
    // formData.append('detection', 'aws_rek_face') // we need to set this param in order to get the recognized faces in the response
    // const timestamp = Date.now() / 1000
    // formData.append('timestamp', timestamp)
    // const stringToSign = `detection=aws_rek_face&timestamp=${timestamp}&upload_preset=asnf0nj6${apiSecret}`
    // const signature = Rusha.createHash().update(stringToSign).digest('hex')
    // formData.append('signature', signature)

    const request = new XMLHttpRequest()
    request.open('POST', url)

    request.upload.onprogress = (e) => {
      setError(null)
      progress(e.lengthComputable, e.loaded, e.total)
    }

    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        const {
          delete_token: deleteToken,
          public_id: publicId,
          info,
          width: originalWidth,
          height: originalHeight
        // } = JSON.parse(request.response)
        } = rihannaAwkward

        console.log(request.response)

        setLoading(false)

        setFaces([])

        // let celebrityFaces = info.detection.aws_rek_face.data.celebrity_faces // recognized faces
        // celebrityFaces = (celebrityFaces.length <= 0) ? info.detection.aws_rek_face.data.unrecognized_faces : celebrityFaces
        const celebrityFaces = info.detection.aws_rek_face.data.celebrity_faces
        const unrecognizedFaces = info.detection.aws_rek_face.data.unrecognized_faces

        celebrityFaces.forEach((face, i) => {
          const key = publicId + i
          const isCelebrity = true
          const name = face.name
          const boundingBox = face.face.bounding_box
          const emotionType = face.face.emotions[0].type // emotions are already sorted by confidence
          const url = optimizeImage({ publicId })

          // const moreDataURL = face.urls[0]

          setUrl(url)
          setFaces((oldFaces) => (
            [...oldFaces, { key, isCelebrity, name, boundingBox, emotionType }]
          ))

          // searchCelebrity({ name })
          //   .then((celebrityDetails) => {
          //     setUrl(url)
          //     setFaces((oldFaces) => (
          //       [...oldFaces, { key: publicId + i, name, boundingBox, emotionType, ...celebrityDetails }]
          //     ))
          //   })
        })

        const celebrityFacesLength = celebrityFaces.length

        unrecognizedFaces.forEach((face, i) => {
          const key = publicId + celebrityFacesLength + i
          const isCelebrity = false
          const boundingBox = face.bounding_box
          const emotionType = face.emotions[0].type // emotions are already sorted by confidence
          const url = optimizeImage({ publicId })

          setUrl(url)
          setFaces((oldFaces) => (
            [...oldFaces, { key, isCelebrity, boundingBox, emotionType }]
          ))
        })

        load(deleteToken)
      } else if (request.status === 420) {
        setLoading(false)
        setError('Run out of tries (50/50)')
        error(request.responseText)
      } else {
        setLoading(false)
        setError(null)
        error(request.responseText)
      }
    }

    request.send(formData)

    return {
      abort: () => {
        request.abort()

        abort()
      }
    }
  }

  const revert = (
    uniqueFileId,
    load,
    error
  ) => {
    const url = `${baseUrl}/delete_by_token`

    const request = new XMLHttpRequest()
    request.open('POST', url)

    request.setRequestHeader('Content-Type', 'application/json')

    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        load()
      } else {
        error(request.responseText)
      }
    }

    request.send(JSON.stringify({ uniqueFileId }))
  }

  return {
    process,
    revert
  }
}
