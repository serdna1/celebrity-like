import { useState } from 'react'
import { FilePond } from 'react-filepond'

import { useFilePondServer } from '../hooks/useFilePondServer'

import 'filepond/dist/filepond.min.css'

export const FilePondComponent = () => {
  const [files, setFiles] = useState([])
  const { process, revert } = useFilePondServer()

  return (
    <>
      <div style={{ width: '80%', padding: '1%' }}>
        <FilePond
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
