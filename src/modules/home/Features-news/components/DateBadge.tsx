'use client'

import React from 'react'

interface DateBadgeProps {
  day: string
  monthYear: string
}

export const DateBadge: React.FC<DateBadgeProps> = ({ day, monthYear }) => {
  return (
    <div className='flex h-full w-[4.25rem] flex-col items-center justify-center rounded-bl-[1rem] bg-[#facc15] text-white shadow-xs xsm:w-[4.75rem] sm:w-[5.25rem]'>
      <span className='text-[1.5rem] font-extrabold leading-none xsm:text-[1.75rem] sm:text-[2rem]'>
        {day}
      </span>
      <span className='mt-[0.25rem] text-[0.625rem] font-medium opacity-90 xsm:text-[0.6875rem] sm:text-[0.75rem]'>
        {monthYear}
      </span>
    </div>
  )
}
