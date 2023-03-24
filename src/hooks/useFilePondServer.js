import { useContext } from 'react'
import Rusha from 'rusha'

import { CelebritiesContext } from '../context/celebrities'
import { apiKey, cloudName, uploadPreset, apiSecret } from '../cloudinary/cloudinaryConfig'
import { searchCelebrity } from '../service/celebrities'
import { makeTransformations } from '../service/cloudinary'
import { upload } from '../mocks/upload'

const baseUrl = `https://api.cloudinary.com/v1_1/${cloudName}`

// This hook is used along the filepond dependency (the dropzone)
export const useFilePondServer = () => {
  const { setCelebrities, setLoading, setError } = useContext(CelebritiesContext)

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
        } = upload[0]
        // console.log(upload)

        setLoading(false)

        setCelebrities([])

        let celebrityFaces = info.detection.aws_rek_face.data.celebrity_faces // recognized faces
        celebrityFaces = (celebrityFaces.length <= 0) ? info.detection.aws_rek_face.data.unrecognized_faces : celebrityFaces

        // Aqui habria que poner los rectangulos sobre las caras
        celebrityFaces.forEach(face => {
          const name = face.name
          const emotionType = face.face.emotions[0].type // emotions are already sorted by confidence
          const boundingBox = face.face.bounding_box
          const celebrityURL = makeTransformations({ publicId, originalWidth, originalHeight, boundingBox, name, emotionType })

          const moreDataURL = face.urls[0]

          // setCelebrities((oldCelebrities) => (
          //   [...oldCelebrities, { celebrityURL, moreDataURL }]
          // ))

          searchCelebrity({ name })
            .then((newCelebrityDetails) => setCelebrities((oldCelebrity) => (
              [...oldCelebrity, { celebrityURL, moreDataURL, ...newCelebrityDetails }]
            )))
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
