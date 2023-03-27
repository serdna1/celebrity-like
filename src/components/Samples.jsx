import { Sample } from './Sample'

import './Samples.css'

export const Samples = () => {
  return (
    <section className='samplesContainer'>
      <h3>Or try one of this:</h3>
      <div className='samples'>
        <Sample filename='rihanna.jpg' alt='Rihanna sample image' />
        <Sample filename='donald-trump.webp' alt='Donald Trump sample image' />
        <Sample filename='david-tennant.webp' alt='David Tennant sample image' />
        <Sample filename='rolling-stones.jpg' alt='Rolling Stones sample image' />
      </div>
    </section>
  )
}
