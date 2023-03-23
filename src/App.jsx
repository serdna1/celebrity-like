import { FilePondComponent } from './components/FilePondComponent'
import { CelebrityList } from './components/CelebrityList'
import { Samples } from './components/Samples'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

import './App.css'

function App () {
  return (
    <>
      <Header />
      <div className='page'>
        <FilePondComponent />
        <Samples />
        <CelebrityList />
      </div>
      <Footer />
    </>
  )
}

export default App
