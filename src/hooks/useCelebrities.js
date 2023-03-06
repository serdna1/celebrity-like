import { useState } from 'react'
import { searchCelebrity } from '../service/celebrities'

export const useCelebrities = () => {
  const [celebrity, setCelebrity] = useState({})

  const refreshCelebrity = ({ search }) => {
    searchCelebrity({ search })
      .then((newCelebrity) => setCelebrity(newCelebrity))
  }

  return {
    celebrity,
    refreshCelebrity
  }
}
