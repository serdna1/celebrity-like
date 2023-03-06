import './CelebrityCard.css'

export const CelebrityCard = ({ url, moreDataURL, occupation }) => {
  return (
    <a href={'https://' + moreDataURL}>
      <div className='card'>
        <img src={url} alt='gjkghk' />
        <p>{occupation[0]}</p>
      </div>
    </a>
  )
}
