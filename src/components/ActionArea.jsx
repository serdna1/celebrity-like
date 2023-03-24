import { CustomFilePond } from './CustomFilePond'
import { Samples } from './Samples'

import './ActionArea.css'

export const ActionArea = () => {
  return (
    <div className='actionArea'>
      <CustomFilePond />
      <Samples />
    </div>
  )
}
