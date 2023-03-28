import { useContext } from 'react'
import { FacesContext } from '../context/faces'

import './FixedFooter.css'

export const FixedFooter = () => {
  const { loading } = useContext(FacesContext)

  return (
    <footer className='footer'>
      loading: {`${loading}`}
    </footer>
  )
}
