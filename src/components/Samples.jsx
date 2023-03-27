import { Sample } from './Sample'

import './Samples.css'

export const Samples = () => {
  return (
    <section className='samplesContainer'>
      <h3>Or try one of this:</h3>
      <div className='samples'>
        <Sample filename='selfieWithPedroPascal.jpg' alt='A woman taking a selfie with a cover of Pedro Pascal in hte street (sample image)' />
        <Sample filename='coolio.jpg' alt='A woman takes a selfie with the rapper Coolio (sample image)' />
        <Sample filename='colby-theoffice.jpg' alt='A man takes a selfie while The Office is playing on background (sample image)' />
        <Sample filename='rihannaAwkward.webp' alt='Rihanna and Fredrik Jacobson selfie (sample image)' />
      </div>
    </section>
  )
}
