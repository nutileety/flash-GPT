import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import moment from 'moment'



const Sidebar = () => {
  const { user, chats, setSelectedChat, theme, setTheme, navigate } = useAppContext(); 
  const [ search, setSearch ] = useState('');  

  return (
    <div className='flex flex-col h-screen min-w-64 p-5 dark:bg-gradient-to-b 
    from-[#242124]/30 to-[#000000]/30 border-r border-[#80609f]/30 backdrop-blur-3xl
    transistion-all duration-500 max-md:absolute left-0 z-1'>
      {/* logo */}
      <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} alt=""
        className='w-full max-w-48' />

      {/* new chat */}
      <button className='flex justify-center items-center w-full py-1.5 mt-5 text-white
        bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md cursor-pointer'>
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
          <div key={chat._id} className=' flex justify-between group p-1 px-2 
            border border-gray-300 dark:border-[#80609f]/10 dark:bg-[#57317c]/10
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
      <div onClick={() => {navigate('/community')}} className='flex items-center
       gap-2 p-1.5 mt-3 text-sm border border-gray-300 dark:border-gray-500 
       cursor-pointer  rounded-md'>
        <img src={assets.gallery_icon} className='w-4 not-dark:invert' alt=''/>
        <div className='flex col text-small'>
          <p>Community images</p>
        </div>
      </div>

      {/* credits */}
      <div onClick={() => {navigate('/credits')}} className='flex items-center 
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
          <div className='w-9 h-5 bg-gray-400 rounded-xl peer-checked:bg-purple-600
            transition-all'>
          </div>
          <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full
            transition-transform peer-checked:translate-x-4'>
          </span>
        </label>
      </div>

    </div>
  )
}

export default Sidebar