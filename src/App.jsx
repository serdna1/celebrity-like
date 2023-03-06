import { useState, useCallback } from 'react'
import { FilePond } from 'react-filepond'

import 'filepond/dist/filepond.min.css'

import { useUpload } from './hooks/useUpload'
import { CelebrityList } from './components/CelebrityList'
import { Samples } from './components/Samples'

import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

function App () {
  const [files, setFiles] = useState([])
  const { makeUploadRequest, makeDeleteRequest } = useUpload()

  const revert = useCallback((token, successCallback, errorCallback) => {
    makeDeleteRequest({
      token,
      successCallback,
      errorCallback
    })
  }, [])

  const process = useCallback((
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
  }, [])

  return (
    <>
      <Header />
      <div className='page'>
        <div style={{ width: '80%', padding: '1%' }}>
          <FilePond
            files={files}
            acceptedFileTypes='image/*'
            onupdatefiles={setFiles}
            server={{ process, revert }}
            name='file'
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
        </div>
        <Samples />
        <CelebrityList />
      </div>
      <Footer />
    </>
  )
}

export default App
