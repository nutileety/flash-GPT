import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';

const Sidebar = () => {
  const { user, chats, setSelectedChat, theme, setTheme } = useAppContext(); 
  const [ search, setSearch ] = useState('');  

  return (
    <div className='flex flex-col h-screen min-w-72 p-5 dark:bg-gradient-to-b 
    from-[#242124]/30 to-[#000000]/30 border-r border-[#80609f]/30 backdrop-blur-3xl
    transistion-all duration-500 max-md:absolute left-0 z-1'>
      {/* logo */}
      <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} alt=""
        className='w-full max-w-48' />

      {/* new chat */}
      <button className='flex justify-center items-center w-full py-2 mt-8 text-white
        bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md cursor-pointer'>
        <span className='mr-2 text-xl'>+</span> New Chat 
        </button>

      {/* search conversation */}
      <div className='flex items-center border gap-2 p-3 mt-4 border-gray-400 rounded-md
        dark:text-white/20 '>
        <img src={assets.search_icon} className='w-4 opacity-50 mot-dark:invert' alt=""/>
        <input onChange={(e) => {setSearch(e.target.value)}} value={search} type='text'
          placeholder='search conversation' className='text-sm 
          placeholder:text-gray-400 outline-none'/>
      </div>
    </div>
  )
}

export default Sidebar