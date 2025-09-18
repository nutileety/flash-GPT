import React from 'react'
import { assets } from '../assets/assets'
import moment  from 'moment'

const Message = ({message}) => {
  return (
    <div>
      { message.role === 'user' ? (
        <div>
          <div>
            <p>{message.content}</p>
            <span>{moment(message.timestamp).fromNow()}</span>
          </div>
          <img src={assets.user_icon} alt='' className='w-8 rounded-full'/>
        </div> 
      )
    :
    (
      <div>
        {message.isImage ? (
          <img src={assets.content} alt='' className='w-full rounded-b-md'/>
        )
      :
      (
        <div>
          {message.content}
        </div>
      )}
      <span>{moment(message.timestamp).fromNow()}</span>
      </div>
    )}
    </div>
  )
}

export default Message