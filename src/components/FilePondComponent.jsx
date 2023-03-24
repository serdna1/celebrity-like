import { useState } from 'react'
import { FilePond } from 'react-filepond'

import { useFilePondServer } from '../hooks/useFilePondServer'
import { Samples } from './Samples'

import 'filepond/dist/filepond.min.css'

import './FilePondComponent.css'

export const FilePondComponent = () => {
  const [files, setFiles] = useState([])
  const { process, revert } = useFilePondServer()

  return (
    <div className='actionArea'>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        acceptedFileTypes='image/*'
        server={{ process, revert }}
        name='file'
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        stylePanelAspectRatio='1:1'
      />
      <Samples />
    </div>
  )
}
