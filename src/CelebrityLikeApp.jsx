import React, { useState } from 'react'
import { FilePond } from 'react-filepond'

import 'filepond/dist/filepond.min.css'

const CLOUDINARY_API_PREFIX = 'https://api.cloudinary.com/v1_1/'
const CLOUD_NAME = 'dze60m7yr'
const UPLOAD_PRESET = 'afpzm8lz'
const API_KEY = '395366624821627'

const myServer = {
//   fetch: null,
//   load: null,
//   revert: null,

  process: (fieldName, file, metadata, load, error, progress, abort) => (
    {
      url: `${CLOUDINARY_API_PREFIX}${CLOUD_NAME}/image/upload`,
      method: 'POST',
      onload: (response) => {
        console.log(response.public_id)
        return response.public_id
      },
      onerror: (response) => {
        console.log(response.data)
        return response.data
      },
      ondata: (formData) => {
        // formData.append('file', 'C:/Users/andres/Downloads/leprechaun.jpg')
        console.log('file', file)
        console.log('fieldName', fieldName)
        formData.append(fieldName, file)
        formData.append('upload_preset', UPLOAD_PRESET)
        formData.append('api_key', API_KEY)
        return formData
      },
      abort: () => { abort() }
    }
  )
}

export const CelebrityLikeApp = () => {
  const [files, setFiles] = useState([])

  return (
    <div className='CelebrityLikeApp'>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        maxFiles={1}
        server={myServer}
        name='files'
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  )
}
