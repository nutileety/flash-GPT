import  { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import Message from './Message';

const ChatBox = () => {
  const { selectedChat, theme } = useAppContext();
  const containerRef = useRef(null)

  const [ messages, setMessages ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  const [ prompt, setPrompt ] = useState('');
  const [ mode, setMode ] = useState('');
  const [ isPublished, setIsPublished ] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    if(selectedChat)
      setMessages(selectedChat.messages)
  } ,[selectedChat])

  useEffect(() => {
    if(containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages])

  return (
    <div className='flex flex-1 flex-col justify-between m-5 md:m-10 xl:mx-30 '>
      
      {/* chat messages */}
      <div ref={containerRef} className='flex-1 mb-4 overflow-y-scroll'>
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

      {mode === 'image' && 
      <label className='inline-flex items-center gap-2 mb-2 text-sm mx-auto'>
        <p className='text-xs'>Pulbish the generated image to community</p>
        <input 
          type='checkbox' 
          onChange={(e) => setIsPublished(e.target.value)}
          className='cursor-pointer' 
          checked={isPublished}/>
      </label>
      }

      {/* Prompting box */}
      <form 
      onSubmit={onSubmit}
      className='bg-primary/20 dark:bg-[#a44336]/20 rounded-full w-full 
        border border-primary dark:border-[#a46311]/50 pl-4 p-2 
        mx-auto flex gap-2 max-w-xl h-10 items-center '>
        <select 
          onChange={(e) => setMode(e.target.value)} 
          className='pl-2 pr-1 text-xs outline-none'
          value={mode}>
            <option className='dark:bg-amber-700/60' value='text'> Text </option>
            <option className='dark:bg-amber-700/60' value='image'> Image </option>
        </select>
        <input 
          onChange={(e) => setPrompt(e.target.value)} 
          type='text'
          value={prompt} 
          placeholder='Type your prompt here...'
          className='flex-1 w-full text-sm outline-none'
          required/> 
        <button disabled={loading}>
          <img 
            src={loading ? assets.stop_icon : assets.send_icon}
            className='w-8 cursor-pointer'
            alt=''/>
        </button>
      </form>
    </div>
  )
}

export default ChatBox