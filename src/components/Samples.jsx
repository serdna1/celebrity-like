import { useContext } from 'react'
import { ImagesContext } from '../context/images'
import { celebrities } from '../mocks/celebrities'
import { makeTransformations } from '../service/cloudinary'
import './Samples.css'

export const Samples = () => {
  const { setCelebrities } = useContext(ImagesContext)

  const handleSampleClick = ({ nname }) => {
    const publicId = 'rihanna_sswdum'
    const name = 'rihanna'
    const emotion = 'HAPPY'

    const celebrityURL = makeTransformations({ publicId, name, emotion })

    setCelebrities((oldCelebrity) => (
      [...oldCelebrity, { celebrityURL, ...celebrities.find(c => (c.name === name)) }]
    ))
  }

  return (
    <>
      <h3>Download the next images and drop them above:</h3>
      <div className='samples'>
        {/* <button>
        className='sample-button'
        onClick={() => handleSampleClick({ nname: 'rihanna' })}
      > */}
        <a href='https://res.cloudinary.com/dze60m7yr/image/upload/v1678100497/rihanna_sswdum.png'>
          <div className='sample'>
            <img src='https://res.cloudinary.com/dze60m7yr/image/upload/c_thumb,g_auto:face,h_150,w_150,z_0.7/f_webp/q_auto:low/rihanna_sswdum.jpg' alt='riha' />
            <div>671k</div>
          </div>
        </a>
        {/* </button> */}
        <a href='https://res.cloudinary.com/dze60m7yr/image/upload/v1678106851/donald-trump_kxvylv.webp'>
          <div className='sample'>
            <img src='https://res.cloudinary.com/dze60m7yr/image/upload/c_thumb,g_auto:face,h_150,w_150,z_0.7/f_webp/q_auto:low/donald-trump_kxvylv.jpg' alt='riha' />
            <div>761k</div>
          </div>
        </a>
        <a href='https://res.cloudinary.com/dze60m7yr/image/upload/v1678106017/david-tennant_aurjjr.webp'>
          <div className='sample'>
            <img src='https://res.cloudinary.com/dze60m7yr/image/upload/c_thumb,g_auto:face,h_150,w_150,z_0.7/f_webp/q_auto:low/david-tennant_aurjjr.jpg' alt='riha' />
            <div>40k</div>
          </div>
        </a>
        <a href='https://res.cloudinary.com/dze60m7yr/image/upload/v1678106975/rolling-stones_yvpcrw.jpg'>
          <div className='sample'>
            <img src='https://res.cloudinary.com/dze60m7yr/image/upload/c_thumb,g_auto,h_150,w_150,z_0.1/f_webp/q_auto:low/rolling-stones_yvpcrw.jpg' alt='riha' />
            <div>14k</div>
          </div>
        </a>
      </div>
    </>
  )
}
