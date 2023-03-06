import React, { useState, useEffect, useContext } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import { Cloudinary } from '@cloudinary/url-gen'
import { blur } from '@cloudinary/url-gen/actions/effect'

import { useUpload } from './cloudinary/cloudinaryHelper'
import { ImagesContext } from './context/images'
import { useCelebrities } from './hooks/useCelebrities'

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dze60m7yr'
  },
  url: {
    secure: true
  }
})

// const celebrity_url = cld.image('vdfhqv6mvmfmfavpnmze')
const celebrity_url = 'https://res.cloudinary.com/dze60m7yr/image/upload/v1678061752/vdfhqv6mvmfmfavpnmze.webp'

function App () {
  console.log('App')

  const [files, setFiles] = useState([])
  const { makeUploadRequest, makeDeleteRequest } = useUpload()
  const { celebrity } = useContext(ImagesContext)

  const revert = (token, successCallback, errorCallback) => {
    makeDeleteRequest({
      token,
      successCallback,
      errorCallback
    })
  }

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
    const abortRequest = makeUploadRequest({
      file,
      fieldName,
      successCallback: load,
      errorCallback: error,
      progressCallback: progress
    })

    return {
      abort: () => {
        abortRequest()
        abort()
      }
    }
  }

  return (
    <>
      <div style={{ width: '80%', margin: 'auto', padding: '1%' }}>
        <FilePond
          files={files}
          acceptedFileTypes='image/*'
          onupdatefiles={setFiles}
          allowMultiple
          server={{ process, revert }}
          name='file'
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
      </div>
      <div>
        {/* {
          userURL &&
            <img src={userURL} alt='sdafjhs' />
        }
        {
          celebrityURL &&
            <img src={celebrityURL} alt='ennove' />
        } */}
        {celebrity?.celebrityURL && <img src={celebrity.celebrityURL} alt='ennove' />}
        {celebrity?.name && <p>{celebrity.name}</p>}
        {celebrity?.net_worth && <p>{celebrity.net_worth}</p>}
      </div>
    </>
  )
}
export default App
