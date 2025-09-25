import React, { useEffect, useState } from 'react'
import { dummyPublishedImages } from '../assets/assets';
import Loading from './Loading';

const Community = () => {
  const [ images, setImages ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  const fetchImages = async () => {
    setImages(dummyPublishedImages)
    setLoading(false)
  }

  useEffect(() => {
    fetchImages()
  }, [])

  if(loading) return <Loading />

  return (
    <div className='p-8 pl-20 w-full h-full mx-auto xl:px-12 2xl:px-20
    overflow-y-scroll'>
      <h2 className='text-xl font-semibold mb-5 text-gray-600 
      dark:text-primary-200'> Commmunity Images</h2>
      {images.length > 0 ? (
        <div className='flex flex-wrap -mx-2 max-sm:justify-center gap-5'>
          {images.map((item, index) => (
            <a key={index} href={item.imageUrl} target='_blank' className='relative
            group block rounded-lg overflow-hidden border border-gray-200 
            dark:border-orange-800 shadow-sm hover:shadow-md transition-shadow
            duration-300' >
              <img src={item.imageUrl} alt='' className='w-fit h-50 md:h-40
              2xl:h-62 object-cover group-hover:scale-105 transition-transform
              duration-300 ease-in-out jst '/>
              <p className='absolute bottom-0 right-0 text-xs bg-black/50 
              backdrop-blur text-white px-4 py-1 rounded-tl-lg opacity-0
              group-hover:opacity-100 transition duration-300'> Created by {item.userName}</p>
            </a>
            ) 
          )}
        </div>
      )
      :
      (
      <p className='text-lg mt-10 text-gray-600 dark:text-primary-200
        justify-center'> No Images Available!</p>
      )}  
    </div>
  )
}

export default Community