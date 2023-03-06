import './CelebrityCard.css'

export const CelebrityCard = ({ url, occupation }) => {
  return (
    <div className='card'>
      <img src={url} alt='gjkghk' />
      {occupation && <p>{occupation[0]}</p>}
    </div>
  )
}
