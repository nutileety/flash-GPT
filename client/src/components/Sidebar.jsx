import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import moment from 'moment'



const Sidebar = ({isMenuOpen, setIsMenuOpen}) => {
  const { user, chats, setSelectedChat, theme, setTheme, navigate } = useAppContext(); 
  const [ search, setSearch ] = useState('');

  return (
    <div className={`flex flex-col h-screen min-w-64 p-5 not-dark:bg-white 
      dark:bg-gradient-to-b from-[#242124] to-[#000000] border-r 
      border-[#80609f]/30 backdrop-blur-3xl transition-all duration-500 
      max-md:absolute left-0 z-1 ${!isMenuOpen && 'max-md:-translate-x-full'}`}>

      {/* logo */}
      <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} alt=""
        className='w-42' />

      {/* new chat */}
      <button className='flex justify-center items-center w-full py-1.5 mt-2 text-white
        bg-gradient-to-r from-[#EB2F42] to-[#F66652] text-sm rounded-md cursor-pointer'>
        <span className='mr-2 text-lg'>+</span> New Chat 
        </button>

      {/* search conversation */}
      <div className='flex items-center border gap-1 p-1 mt-3 border-gray-400 rounded-md
        dark:text-white/20 '>
        <img src={assets.search_icon} className='w-3 opacity-50 mot-dark:invert' alt=""/>
        <input onChange={(e) => {setSearch(e.target.value)}} value={search} type='text'
          placeholder='search conversation' className='text-sm 
          placeholder:text-gray-400 outline-none'/>
      </div>

      {/* Recent chats */}
      {chats.length > 0 && <p className='mt-3 text-sm'> Recent Chats </p>}
      <div className='flex-1 overflow-y-scroll mt-2 text-sm space-y-2'>
        {chats.filter((chat) => chat.messages[0] ? 
        chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase()) :
        chat.name.toLowerCase().includes(search.toLowerCase())).map((chat) => (
          <div onClick={() => {
            navigate('/');
            setSelectedChat(chat);
            setIsMenuOpen(false)}}
            key={chat._id} 
            className=' flex justify-between group p-1 px-2 
            border border-gray-300 dark:border-[#80609f]/10 dark:bg-[#5c251e]/10
            rounded-md cursor-pointer text-sm'>
            <div>
              <p className='truncate w-full'> 
                {chat.messages.length > 0 ? 
                chat.messages[0].content.slice(0, 32) : chat.name}
              </p>
              <p className='text-xs text-gray-500 dark:text-[#b1a6c0]'>
                {moment(chat.updatedAt).fromNow()}
              </p>
            </div>
            <img src={assets.bin_icon} className='hidden group-hover:block w-4 
            cursor-pointer not-dark:invert' alt='' />
          </div>
          ))
        }
        
      </div>

        {/* Community images */}
      <div onClick={() => {navigate('/community'); setIsMenuOpen(false);}} className='flex items-center
       gap-2 p-1.5 mt-3 text-sm border border-gray-300 dark:border-gray-500 
       cursor-pointer  rounded-md'>
        <img src={assets.gallery_icon} className='w-4 not-dark:invert' alt=''/>
        <div className='flex col text-small'>
          <p>Community images</p>
        </div>
      </div>

      {/* credits */}
      <div onClick={() => {navigate('/credits'); setIsMenuOpen(false);}} className='flex items-center 
        gap-2 p-1.5 mt-3 text-sm border border-gray-300 dark:border-gray-500 
        cursor-pointer rounded-md hover:scale-103 transition-all'>
        <img src={assets.diamond_icon} className='w-4 dark:invert' alt=''/>
        <div className='text-sm'>
          <p>Credits: {user?.credits} </p>
          <p className='text-xs text-gray-400'> Purchase Credits to use Flash!</p>
        </div>
      </div>

      {/* Darkmode */}
      <div className='flex items-center justify-between gap-2 p-1.5 mt-3 text-sm border
       border-gray-300 dark:border-gray-500 cursor-pointer rounded-md'>
        <div className='flex gap-2 text-sm items-center'>
          <img src={assets.theme_icon} className='w-4 not-dark:invert' alt=''/>
          <p className='text-sm'> Dark Mode </p>
        </div>
        <label className='relative inline-flex cursor-pointer'>
          <input onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
          className='sr-only peer' type='checkbox' checked={theme === 'dark'}/>
          <div className='w-9 h-5 bg-gray-400 rounded-xl peer-checked:bg-orange-700
            transition-all'>
          </div>
          <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full
            transition-transform peer-checked:translate-x-4'>
          </span>
        </label>
      </div>

      {/* user Account */}
      <div  className='flex group items-center gap-3 p-2 mt-2 text-sm border 
      border-gray-300 dark:border-gray-500 cursor-pointer rounded-md'>
        <img src={assets.user_icon} className='w-7' alt=''/>
        <p className='flex-1 text-sm dark:text-primary truncate'>{user ? user.name : 'Login with user'}</p>
        {user && <img 
                  src={assets.logout_icon} 
                  className='w-5 hidden group-hover:block cursor-pointer not-dark:invert'
                  />}
      </div> 

      <img onClick={() => setIsMenuOpen(false)} src={assets.close_icon} 
           className='absolute top-3 right-3 w-5 h-5 md:hidden cursor-pointer 
           not-dark:invert z-40'
           alt=""/>

    </div>
  )
}

export default Sidebar