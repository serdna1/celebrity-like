import { colbyTheOffice, coolio, rihannaAwkward, selfieWithPedroPascal } from '../mocks'
import { Sample } from './Sample'

import './Samples.css'

export const Samples = () => {
  return (
    <section className='samplesContainer'>
      <h3>Or try one of this:</h3>
      <div className='samples'>
        <Sample
          publicId='celebrity-like/samples/selfieWithPedroPascal.jpg'
          alt='A woman taking a selfie with a cover of Pedro Pascal in hte street (sample image)'
          info={selfieWithPedroPascal.info}
        />
        <Sample
          publicId='celebrity-like/samples/coolio.jpg'
          alt='A woman takes a selfie with the rapper Coolio (sample image)'
          info={coolio.info}
        />
        <Sample
          publicId='celebrity-like/samples/colby-theoffice.jpg'
          alt='A man takes a selfie while The Office is playing on background (sample image)'
          info={colbyTheOffice.info}
        />
        <Sample
          publicId='celebrity-like/samples/rihannaAwkward.webp'
          alt='Rihanna and Fredrik Jacobson selfie (sample image)'
          info={rihannaAwkward.info}
        />
      </div>
    </section>
  )
}
