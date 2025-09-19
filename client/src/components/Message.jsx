import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import moment  from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'

const Message = ({message}) => {

  useEffect(() => {
    Prism.highlightAll()
  }, [message.content])

  return (
    <div>
      { message.role === 'user' ? (
        <div className='flex items-start justify-end my-4 gap-2'>
          <div className='flex-col px-2 py-1 bg-primary/20 dark:bg-[#f44336]/10
           border border-[#80609f]/20 rounded-md w-fit max-w-md'> 
            <p className='text-sm dark:text-primary'>{message.content}</p>
            <span className='text-xs text-gray-500 dark:text-white/40'>{moment(message.timestamp).fromNow()}</span>
          </div>
          <img src={assets.user_icon} alt='' className='w-8 rounded-full'/>
        </div> 
      )
    :
    (
      <div className='inline-flex flex-col p-2 px-4 max-w-md bg-primary/20
           dark:bg-[#f44336]/10 border border-[#80609f]/20 rounded-md my-2'>
        {message.isImage ? (
          <img src={message.content} alt='' className='w-full mt-2 rounded-md'/>
        )
      :
      (
        <div className='text-sm dark:text-primary reset-tw'>
          <Markdown>{message.content}</Markdown>
        </div>
      )}
      <span className='text-xs text-gray-500 dark:text-white/40'>
         {moment(message.timestamp).fromNow()}
      </span>
      </div>
    )}
    </div>
  )
}

export default Message