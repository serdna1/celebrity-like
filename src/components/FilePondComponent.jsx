import { useState, useCallback, useRef } from 'react'
import { FilePond } from 'react-filepond'

import { useUpload } from '../hooks/useUpload'

import 'filepond/dist/filepond.min.css'

export const FilePondComponent = () => {
  const pond = useRef(null)
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
      <div style={{ width: '80%', padding: '1%' }}>
        <FilePond
          ref={pond}
          files={files}
          onupdatefiles={setFiles}
          acceptedFileTypes='image/*'
          server={{ process, revert }}
          name='file'
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
      </div>
    </>
  )
}
