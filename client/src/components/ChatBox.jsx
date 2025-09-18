import  { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import Message from './Message';

const ChatBox = () => {
  const { selectedChat, theme } = useAppContext();

  const [ messages, setMessages ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if(selectedChat)
      setMessages(selectedChat.messages)
  } ,[selectedChat])

  return (
    <div className='flex flex-1 flex-col justify-between m-5 md:m-10 xl:mx-30 '>
      
      {/* chatBox */}
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

        {messages.map((message, index) => <Message message={message} key={index} />)}
      </div>
    </div>
  )
}

export default ChatBox