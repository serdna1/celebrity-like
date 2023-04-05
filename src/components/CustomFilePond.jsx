import { useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

import { useFilePondServer } from '../hooks/useFilePondServer'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import './CustomFilePond.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export const CustomFilePond = () => {
  const [files, setFiles] = useState([])
  const { process, revert } = useFilePondServer()

  return (
    <FilePond
      files={files}
      onupdatefiles={setFiles}
      acceptedFileTypes='image/*'
      server={{ process, revert }}
      name='file'
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      stylePanelAspectRatio='1:1'
    />
  )
}
