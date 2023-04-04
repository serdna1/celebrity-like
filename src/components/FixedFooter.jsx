import { useContext, useState, useEffect } from 'react'
import { FacesContext } from '../context/faces'

import './FixedFooter.css'

export const FixedFooter = () => {
  // const { loading } = useContext(FacesContext)
  const [innerWidth, setInnerWidth] = useState(null)

  useEffect(() => {
    const onResize = () => {
      setInnerWidth(window.innerWidth)
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <footer className='footer'>
      {/* loading: {`${loading}`} */}
      window.innerWidth: {innerWidth}
    </footer>
  )
}
