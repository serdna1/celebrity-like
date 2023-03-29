import { useContext } from 'react'
import Rusha from 'rusha'

import { FacesContext } from '../context/faces'
import { apiKey, cloudName, uploadPreset, apiSecret, folder } from '../config/cloudinaryConfig'
import { searchCelebrity } from '../service/apiNinjasCelebrities'
import { colbyTheOffice, coolio, rihannaAwkward, rollings, selfieWithPedroPascal } from '../mocks'

const baseUrl = `https://api.cloudinary.com/v1_1/${cloudName}`

// This hook is used along the filepond dependency (the dropzone)
export const useFilePondServer = () => {
  const { setLoading, setError, refreshFaces } = useContext(FacesContext)

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
    setError(null)
    setLoading(true)

    const url = `${baseUrl}/image/upload`

    const formData = new FormData()
    formData.append(fieldName, file)
    formData.append('folder', folder)
    formData.append('upload_preset', uploadPreset)
    formData.append('api_key', apiKey)
    formData.append('detection', 'aws_rek_face') // we need to set this param in order to get the recognized faces in the response
    const timestamp = Date.now() / 1000
    formData.append('timestamp', timestamp)
    const stringToSign = `detection=aws_rek_face&folder=${folder}&timestamp=${timestamp}&upload_preset=asnf0nj6${apiSecret}`
    const signature = Rusha.createHash().update(stringToSign).digest('hex')
    formData.append('signature', signature)

    const request = new XMLHttpRequest()
    request.open('POST', url)

    request.upload.onprogress = (e) => {
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
        } = selfieWithPedroPascal

        console.log(request.response)

        refreshFaces({ publicId, info })

        load(deleteToken)
      } else {
        setLoading(false)
        setError('Something was wrong')
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
