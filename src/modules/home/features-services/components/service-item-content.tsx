'use client'

import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface ServiceItemContentProps {
  title: string
  description: string
  imageUrl: string
}

export const ServiceItemContent: React.FC<ServiceItemContentProps> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <div className='flex flex-1 flex-col gap-[1rem] xsm:flex-row xsm:items-center xsm:gap-[2rem]'>
      <div className='relative h-[12rem] w-full shrink-0 overflow-hidden rounded-[1.5rem] shadow-xs xsm:h-[11rem] xsm:w-[15.625rem]'>
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes='(max-width: 1024px) 100vw, 250px'
          className='object-cover object-center transition-transform duration-500 group-hover:scale-105'
        />
      </div>

      <div className='flex flex-1 items-center justify-between gap-[1rem]'>
        <p className='text-[0.9375rem] leading-relaxed text-[#475569] xsm:text-[0.8125rem]'>
          {description}
        </p>

        <div className='flex shrink-0 items-center justify-center p-[0.25rem] text-[#0284c7] transition-transform duration-300 group-hover:translate-x-[0.25rem]'>
          <ChevronRight className='h-[2rem] w-[2rem] xsm:h-[1.5rem] xsm:w-[1.5rem]' />
        </div>
      </div>
    </div>
  )
}
