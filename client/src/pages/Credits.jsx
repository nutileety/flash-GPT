import React, { useState, useEffect } from 'react'
import { dummyPlans } from '../assets/assets'
import Loading from './Loading'

const Credits = () => {
  const [ plans, setPlans ] = useState([])
  const [ loading, setLoading ] = useState(true)

  const fetchPlans = async () => {
    setPlans(dummyPlans)
    setLoading(false)
  }
  
  useEffect(() => {
    fetchPlans()
  }, [])

  if(loading) return <Loading />
  
  return (
    <div className='max-w-6xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6
    lg:px-4 py-12'>
      <h2 className='text-3xl font-semibold text-center mb-8 xl:mask-t-to-30
      text-gray-700 dark:text-white'>Credit Plans</h2>

      <div className='flex flex-wrap justify-center item-center gap-6'>
        {plans.map((plan) => (
          <div key={plan._id} className={`border border-gray-200  
          dark:border-orange-900 rounded-lg shadow hover:shadow-lg
          transition-shadow pt-1 pl-4 min-w-[180px] flex flex-col ${plan._id === "pro" ? 
          "bg-orange-300/20 dark:bg-orange-700/10" : "bg-white dark:bg-transparent"}`}>
            <div className='flex-1'>
              <h3 className='text-md font-semibold text-gray-900 dark:text-white
              mb-1'>{plan.name}</h3>
              <p className='text-md font-bold text-orange-700 dark:text-orange-300
              mb-3'>%{plan.price}
                <span className='text-base font-normal text-gray-600 
                dark:text-orange-300'>{' '}/{plan.Credits}  Credits</span>
              </p>

              <ul className='list-disc list-inside text-[11px] text-gray-700 pr-2
              dark:text-orange-200 space-y-0.5'>
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button className='m-4 ml-0.5 bg-orange-500 hover:bg-orange-600
             active:bg-orange-800 dark:bg-orange-700/70
            text-white font-medium p-0.5 rounded transition-colors cursor-pointer'>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Credits