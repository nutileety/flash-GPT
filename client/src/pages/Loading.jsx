import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      navigate('/')
    }, 8000)
    return () => clearTimeout(loadTimeout)
  }, []) 

  return (
    <div className=' bg-gradient-to-b from-[#78211b] to-[black] h-screen
      w-screen items-center justify-center backdrop-opacity-60 flex text-primary
      text-lg'>
      <div className=''>
        <img src={assets.logo} className='w-10 h-10 rounded-full opacity-70
          animate-spin duration-1000' />
      </div>
    </div>
  )
}

export default Loading