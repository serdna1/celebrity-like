import React, { useState, useEffect } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { Cloudinary } from '@cloudinary/url-gen'
import { blur } from '@cloudinary/url-gen/actions/effect'

// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
// import 'filepond/dist/filepond.min.css'

import {
  blurImage,
  makeDeleteRequest,
  makeUploadRequest
} from './cloudinary/cloudinaryHelper'

// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

// const baseUrl = `https://api.cloudinary.com/v1_1/${cloudName}`

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dze60m7yr'
  },
  url: {
    secure: true
  }
})

function App () {
  const [files, setFiles] = useState([])

  //   if (files.length > 0) console.log(files[0].serverId)
  console.log(files[0]?.serverId)
  console.log(files[0]?.filename)
  console.log(files)

  //   useEffect(() => {
  //     first
  //   }, [files])

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
      {/* <div>
        {files[0]?.serverId &&
          <img src={blurImage(files[0].serverId)} alt='or' />}
      </div> */}
    </>
  )
}
export default App
