import  { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import Message from './Message';

const ChatBox = () => {
  const { selectedChat, theme } = useAppContext();

  const [ messages, setMessages ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    if(selectedChat)
      setMessages(selectedChat.messages)
  } ,[selectedChat])

  return (
    <div className='flex flex-1 flex-col justify-between m-5 md:m-10 xl:mx-30 '>
      
      {/* chat messages */}
      <div className='flex-1 mb-4 overflow-y-scroll'>
        {messages.length === 0 && (
          <div className='flex flex-col h-full items-center justify-center
            text-primary'>
              <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
                alt='' className='w-full max-w-40 sm:max-w-56' />
              <p className='text-2xl sm:text-4xl text-center pl-4
              dark:text-white text-gray-400' >
                Ask me Anything!
              </p>
          </div>
        )}

        {/* Mapping the messages */}
        {messages.map((message, index) => <Message message={message} key={index} />)}
      </div>

      {/* three dots loading */}
      {loading && 
        <div className='loader flex items-center gap-1 '>
          <div className='w-1 h-1 bg-gray-500 rounded-full dark:bg-white 
            animate-pulse'></div>
          <div className='w-1 h-1 bg-gray-500 rounded-full dark:bg-white 
            animate-pulse'></div>
          <div className='w-1 h-1 bg-gray-500 rounded-full dark:bg-white 
            animate-pulse'></div>
        </div>
      }
    </div>
  )
}

export default ChatBox