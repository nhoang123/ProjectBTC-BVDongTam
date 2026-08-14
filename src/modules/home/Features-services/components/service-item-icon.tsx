'use client'

import Image from 'next/image'
import React from 'react'

interface ServiceItemIconProps {
  iconUrl?: string
}

export const ServiceItemIcon: React.FC<ServiceItemIconProps> = ({ iconUrl }) => {
  return (
    <div className='flex shrink-0 items-center justify-center'>
      <div className='relative flex h-[5rem] w-[5rem] items-center justify-center xsm:h-[2.5rem] xsm:w-[2.5rem]'>
        {iconUrl ? (
          <Image
            src={iconUrl}
            alt='Service Icon'
            width={80}
            height={80}
            className='h-full w-full object-contain'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center rounded-full border-2 border-[#0089cf] bg-[#f0f9ff] text-[#0089cf]'>
            <svg
              className='h-[2.5rem] w-[2.5rem] xsm:h-[1.5rem] xsm:w-[1.5rem]'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              strokeWidth='1.75'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
