import { sha1 } from 'crypto-hash'
import { useState, useEffect } from 'react'

export const Pruebas = () => {
  const [value, setValue] = useState('')

  useEffect(() => {
    const f = async () => { await sha1('hola').then(v => setValue(v)) }
    f()
  }, [])

  return (
    <div>{value}</div>
  )
}
