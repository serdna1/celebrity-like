import { ActionArea } from './components/ActionArea'
import { CelebrityList } from './components/CelebrityList'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

import './App.css'

function App () {
  return (
    <>
      <Header />
      <div className='page'>
        <ActionArea />
        <CelebrityList />
      </div>
      <Footer />
    </>
  )
}

export default App
