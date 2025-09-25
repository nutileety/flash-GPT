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
    <div className='max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6
    lg:px-8 py-10'>
      <h2 className='text-3xl font-semibold text-center mb-10 xl:mask-t-to-30
      text-gray-700 dark:text-white'>Credit Plans</h2>

      <div className='flex flex-wrap justify-center gap-6'>
        {plans.map((plan) => (
          <div key={plan._id} className={`border border-gray-200  
          dark:border-orange-900 rounded-lg shadow hover:shadow-lg
          transition-shadow p-2 min-w-[200px] flex flex-col ${plan._id === "pro" ? 
          "bg-orange-800/20 dark:bg-orange-700/10" : "bg-white dark:bg-transparent"}`}>
            <div className='flex-1'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white
              mb-2'>{plan.name}</h3>
              <p className='text-xl font-bold text-orange-700 dark:text-orange-300
              mb-4'>%{plan.price}
                <span>{' '}/{plan.Credits}  Credits</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Credits