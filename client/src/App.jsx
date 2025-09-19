import {useState} from 'react'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Community from './pages/Community'
import Credits from './pages/Credits'
import ChatBox from './components/ChatBox'
import { assets } from './assets/assets'
import './assets/prism.css'

const App = () => {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);

  return (
    <>
    {!isMenuOpen && (
      <img 
        src={assets.menu_icon} 
        className='absolute h-6 w-8 top-3 left-1 cursor-pointer md:hidden not-dark:invert z-50'
        onClick={() => {setIsMenuOpen(true)}}
      />
    )}

    <div className='dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white'>
      <div className='flex h-screen w-screen'>
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Routes >
          <Route path='/' element={<ChatBox />} />
          <Route path='/credits' element={<Credits />} />
          <Route path='/community' element={<Community />} />
        </Routes>
      </div>
    </div>
    </>
  )
}

export default App