import { useState } from 'react'
import { FilePond } from 'react-filepond'

import { useUpload } from './cloudinary/cloudinaryHelper'
import { CelebrityList } from './components/CelebrityList'

import './App.css'
import { Samples } from './components/Samples'

function App () {
  console.log('App')

  const [files, setFiles] = useState([])
  const { makeUploadRequest, makeDeleteRequest } = useUpload()

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
    <div className='page'>
      <div style={{ width: '80%', padding: '1%' }}>
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
      <Samples />
      <CelebrityList />
    </div>
  )
}

export default App
