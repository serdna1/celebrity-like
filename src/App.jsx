import { ActionArea } from './components/ActionArea'
import { Result } from './components/Result'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { FixedFooter } from './components/FixedFooter'

import './App.css'

function App () {
  return (
    <>
      <Header />
      <div className='page'>
        <ActionArea />
        <Result />
      </div>
      <Footer />
      {import.meta.env.DEV && <FixedFooter />}
    </>
  )
}

export default App
