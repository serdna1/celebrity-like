import './Samples.css'

export const Samples = () => {
  return (
    <>
      <h3>Clik on the next images, download and drop them above:</h3>
      <div className='samples'>
        <a href='https://res.cloudinary.com/dze60m7yr/image/upload/v1678100497/rihanna_sswdum.png'>
          <div className='sample'>
            <img src='https://res.cloudinary.com/dze60m7yr/image/upload/c_thumb,g_auto:face,h_150,w_150,z_0.7/f_webp/q_auto:low/rihanna_sswdum.jpg' alt='riha' />
            <div>671KB</div>
          </div>
        </a>
        <a href='https://res.cloudinary.com/dze60m7yr/image/upload/v1678106851/donald-trump_kxvylv.webp'>
          <div className='sample'>
            <img src='https://res.cloudinary.com/dze60m7yr/image/upload/c_thumb,g_auto:face,h_150,w_150,z_0.7/f_webp/q_auto:low/donald-trump_kxvylv.jpg' alt='riha' />
            <div>761KB</div>
          </div>
        </a>
        <a href='https://res.cloudinary.com/dze60m7yr/image/upload/v1678106017/david-tennant_aurjjr.webp'>
          <div className='sample'>
            <img src='https://res.cloudinary.com/dze60m7yr/image/upload/c_thumb,g_auto:face,h_150,w_150,z_0.7/f_webp/q_auto:low/david-tennant_aurjjr.jpg' alt='riha' />
            <div>40KB</div>
          </div>
        </a>
        <a href='https://res.cloudinary.com/dze60m7yr/image/upload/v1678106975/rolling-stones_yvpcrw.jpg'>
          <div className='sample'>
            <img src='https://res.cloudinary.com/dze60m7yr/image/upload/c_thumb,g_auto,h_150,w_150,z_0.1/f_webp/q_auto:low/rolling-stones_yvpcrw.jpg' alt='riha' />
            <div>14KB</div>
          </div>
        </a>
      </div>
    </>
  )
}
